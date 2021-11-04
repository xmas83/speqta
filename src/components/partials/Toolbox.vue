<template>
    <sticky-wrapper
            :breakpoint="992"
            type="mobile"
            stickyClass="sticky-toolbox"
            direction="up"
            :offsetTop="450"
    >
        <nav class="toolbox sticky-toolbox sticky-content fix-top">
            <div class="toolbox-left">
                <a
                        href="javascript:;"
                        @click.prevent="showSidebar('sidebar-active')"
                        class="toolbox-item left-sidebar-toggle btn btn-outline btn-primary btn-rounded btn-icon-right"
                >Filter<i class="fas fa-chevron-right"></i></a>

                <div class="toolbox-item toolbox-sort select-box text-dark">
                    <label>Sort By :</label>
                    <select
                            name="orderby"
                            class="form-control"
                            v-model="sortBy"
                            aria-label="select sort"
                            @change="setSortby"
                    >
                        <option value="default">Default</option>
                        <option value="title">Title</option>
                        <option value="actor">Actor</option>
                        <option value="director">Director</option>
                    </select>
                </div>

            </div>
            <div class="toolbox-right">
                <div class="toolbox-item toolbox-show select-box text-dark">
                    <label>Show :</label>
                    <select
                            name="count"
                            class="form-control"
                            v-model="perPage"
                            aria-label="select showing count"
                            @change="setPerPage"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
        </nav>
    </sticky-wrapper>
</template>

<script>
  import StickyWrapper from '../elements/StickyWrapper';

  export default {
    components: {
      StickyWrapper
    },
    data: function () {
      return {
        sortBy: this.$route.query.sort_by
          ? this.$route.query.sort_by
          : 'default',
        perPage: this.$route.query.per_page
          ? this.$route.query.per_page
          : 10
      };
    },
    watch: {
      $route: function () {
        this.sortBy = this.$route.query.sort_by
          ? this.$route.query.sort_by
          : 'default';
        this.perPage = this.$route.query.per_page
          ? this.$route.query.per_page
          : 10;
      }
    },
    methods: {
      setSortby: function () {
        this.$router.push({
          query: {...this.$route.query, sort_by: this.sortBy}
        });
      },
      setPerPage: function () {
        this.$router.push({
          query: {...this.$route.query, per_page: this.perPage, page: 1}
        });
      },
      showSidebar: function (string = 'sidebar-active') {
        document.querySelector('body').classList.add(string);
      }/** Methods to push queries */
    }
  };
</script>
