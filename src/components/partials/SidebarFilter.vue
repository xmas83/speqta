<template>
    <aside :class="`col-lg-3 sidebar-fixed sidebar-toggle-remain shop-sidebar sticky-sidebar-wrapper ${sidebarClass}`">
        <div
                class="sidebar-overlay"
                @click="hideSidebar"
        ></div>
        <a
                class="sidebar-close"
                href="javascript:;"
                @click.prevent="hideSidebar"
        ><i class="fas fa-times"></i></a>

        <div
                class="sidebar-content"
                v-sticky="isSticky"
                sticky-offset="{top: 0}"
                ref="stickySidebar"
        >
            <div class="widget widget-collapsible border-no">
                <h3
                        class="widget-title"
                        @click="toggleState(0)"
                        :class="{'collapsed': !openState[0]}"
                >Director<span class="toggle-btn"></span>
                </h3>

                <vue-slide-toggle :open="openState[0]">
                    <div class="row">
                        <div class="col-6">
                            <ul class="widget-body filter-items">
                                <li
                                        v-for="(item,index) in year.slice(0, year.length / 2 + year.length % 2)"
                                        :key="'year-filter' + index"
                                        :class="{active: isActivedYear(item)}"
                                >
                                    <router-link :to="yearFilterRoute(item)">{{ item.name }}</router-link>
                                </li>
                            </ul>
                        </div>
                        <div class="col-6">
                            <ul class="widget-body filter-items">
                                <li
                                        v-for="(item,index) in year.slice(year.length / 2 + year.length % 2, year.length)"
                                        :key="'year-filter' + index"
                                        :class="{active: isActivedYear(item)}"
                                >
                                    <router-link :to="yearFilterRoute(item)">{{ item.name }}</router-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </vue-slide-toggle>
            </div>

            <div class="widget widget-collapsible">
                <h3
                        class="widget-title"
                        @click="toggleState(1)"
                        :class="{'collapsed': !openState[1]}"
                >Actor<span class="toggle-btn"></span>
                </h3>

                <vue-slide-toggle :open="openState[1]">
                    <ul class="widget-body filter-items">
                        <li
                                v-for="(item,index) in actorNames"
                                :key="'actor-filter' + index"
                                :class="{active: isActivedActor(item)}"
                        >
                            <router-link :to="actorFilterRoute(item)">{{ item.name }}</router-link>
                        </li>
                    </ul>
                </vue-slide-toggle>
            </div>

            <div class="widget widget-collapsible">
                <h3
                        class="widget-title"
                        @click="toggleState(2)"
                        :class="{'collapsed': !openState[2]}"
                >Director<span class="toggle-btn"></span>
                </h3>

                <vue-slide-toggle :open="openState[2]">
                    <ul class="widget-body filter-items">
                        <li
                                v-for="(item,index) in directorNames"
                                :key="'color-filter' + index"
                                :class="{active: isActivedDirector(item)}"
                        >
                            <router-link :to="directorFilterRoute(item)">{{ item.name }}</router-link>
                        </li>
                    </ul>
                </vue-slide-toggle>
            </div>
        </div>
    </aside>
</template>

<script>
  import {VueSlideToggle} from 'vue-slide-toggle';
  import Sticky from 'vue-sticky-directive';

  import {scrollHandler} from '../../utils';

  import {directorNames, actorNames, year} from '../../assets/data/movie_sidebar_data';

  export default {
    components: {
      VueSlideToggle
    },
    directives: {
      Sticky
    },
    props: {
      sidebarClass: {
        type: String,
        default: 'sidebar'
      },
      showFilterButton: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return {
        openState: new Array(100).fill(true),
        directorNames: directorNames,
        actorNames: actorNames,
        year: year,
        isSticky: true
      };
    },
    watch: {
      $route: function () {
        scrollHandler();
      }
    },
    created: function () {
      this.resizeHandler();
      window.addEventListener('resize', this.resizeHandler);
    },
    destroyed: function () {
      window.removeEventListener('resize', this.resizeHandler);
    },
    methods: {
      toggleSidebar: function (e) {
        if (window.innerWidth > 991) {
          e.currentTarget.closest('.shop-sidebar').classList.toggle('closed');

          if (e.currentTarget.closest('.shop-sidebar').classList.contains('closed') && this.$route.query.type !== 'list')
            e.currentTarget.closest('.page-content').querySelector('.card-wrapper').classList.add('cols-md-4');
          else
            e.currentTarget.closest('.page-content').querySelector('.card-wrapper').classList.remove('cols-md-4');
        } else {
          this.hideSidebar();
        }
      }, /** Methods to toggle sidebar when click sidebar toggle button in mobile mode. */
      toggleState: function (index) {
        let temp = [...this.openState];
        temp[index] = !temp[index];
        this.openState = temp;
        window.width > 991 &&
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.stickySidebar[
              '@@vue-sticky-directive'
              ].update();
          }, 140);
        });
      }, /** Method to save toggle state of each filter slide toggle. */
      actorFilterRoute: function (item) {
        let selectedActors = this.$route.query.actors
          ? this.$route.query.actors.split(',')
          : [];
        let index = selectedActors.indexOf(item.slug);
        if (index > -1) {
          selectedActors.splice(index, 1);
        } else {
          selectedActors.push(item.slug);
        }

        return {
          path: this.$route.path,
          query: {
            ...this.$route.query,
            actors: selectedActors.toString(),
            page: 1
          }
        };
      }, /** Method to push actor filter query */
      directorFilterRoute: function (item) {
        let selectedDirectors = this.$route.query.directors
          ? this.$route.query.directors.split(',')
          : [];
        let index = selectedDirectors.indexOf(item.slug);
        if (index > -1) {
          selectedDirectors.splice(index, 1);
        } else {
          selectedDirectors.push(item.slug);
        }

        return {
          path: this.$route.path,
          query: {
            ...this.$route.query,
            page: 1,
            directors: selectedDirectors.toString()
          }
        };
      }, /** Method to push director filter query */
      yearFilterRoute: function (item) {
        let selectedYears = this.$route.query.years
          ? this.$route.query.years.split(',')
          : [];
        let index = selectedYears.indexOf(item.slug);
        if (index > -1) {
          selectedYears.splice(index, 1);
        } else {
          selectedYears.push(item.slug);
        }

        return {
          path: this.$route.path,
          query: {
            ...this.$route.query,
            page: 1,
            years: selectedYears.toString()
          }
        };
      }, /** Method to push year filter query */
      isActivedDirector: function (item) {
        return (
          this.$route.query.directors &&
          this.$route.query.directors.split(',').includes(item.slug)
        );
      }, /** Methods to activate director filter item of sidebar */
      isActivedActor: function (item) {
        return (
          this.$route.query.actors &&
          this.$route.query.actors.split(',').includes(item.slug)
        );
      }, /** Methods to activate actor filter item of sidebar */
      isActivedYear: function (item) {
        return (
          this.$route.query.years &&
          this.$route.query.years.split(',').includes(item.slug)
        );
      }, /** Methods to activate year filter item of sidebar */
      resizeHandler: function () {
        this.isSticky = window.innerWidth > 991 ? true : false;
        window.innerWidth > 991 && this.hideSidebar();
      },
      hideSidebar: function () {
        document
          .querySelector('body')
          .classList.remove('sidebar-active');
      }
    }
  };
</script>
