<template>
    <div>
        <toolbox></toolbox>

        <div :class="`${ 'row ' + gridClasses} card-wrapper`">
            <template>
                <div
                        class="card-wrap"
                        v-for="item in cards"
                        :key="`shop-${item.title}`"
                >
                    <card
                            :card="item"
                    ></card>
                </div>
            </template>
        </div>

        <template v-if="cards !== null">
            <nav
                    class="toolbox toolbox-pagination"
                    v-if="total > 0"
            >
                <p class="show-info">Showing <span>{{ Math.min(perPage, cards.length) }} of {{ total }}</span> Cards</p>

                <pagination
                        :total-page="totalPage"
                        v-if="totalPage"
                ></pagination>
            </nav>

            <p v-else>No cards were found matching your selection.</p>
        </template>
    </div>
</template>

<script>
  import Card from '../elements/Card.vue';
  import Pagination from '../elements/Pagination.vue';
  import Toolbox from '../partials/Toolbox.vue';

  import {directorNames, actorNames} from '../../assets/data/movie_sidebar_data';

  import cardData from '../../assets/data/movies.json';

  export default {
    components: {
      Toolbox,
      Card,
      Pagination
    },
    data: function () {
      return {
        cards: null,
        perPage: this.$route.query.per_page ? this.$route.query.per_page : 10,
        years: null,
        page: 1,
        totalPage: 1,
        total: 0,
        gridClasses: "cols-xs-2 cols-sm-3"
      }
    },
    watch: {
      $route: function () {
        this.perPage = this.$route.query.per_page ? parseInt(this.$route.query.per_page) : 10;
        this.years = this.$route.query.years ? this.$route.query.years : '';
        this.getCards();
      }
    },
    mounted: function () {
      this.getCards();
    },
    methods: {
      getCards: function () {
        this.cards = cardData.movies;
        this.page = this.$route.query.page ? this.$route.query.page : 1;

        if (!this.$route.query.sort_by || this.$route.query.sort_by === 'default')
          this.cards = this.cards.sort((itemA, itemB) => itemB.year - itemA.year);
        else if (this.$route.query.sort_by === 'title')
          this.cards = this.cards.sort((itemA, itemB) => itemA.title.localeCompare(itemB.title));
        else if (this.$route.query.sort_by === 'actor')
          this.cards = this.cards.sort((itemA, itemB) => itemA.actor.localeCompare(itemB.actor));
        else if (this.$route.query.sort_by === 'director')
          this.cards = this.cards.sort((itemA, itemB) => itemA.director.localeCompare(itemB.director));

        this.cards = this.cards.filter(item => {
          let flag = true;

          if (this.$route.query.search) {
            flag = item.title.toLowerCase().includes(this.$route.query.search.toLowerCase());
          }

          if (flag && this.$route.query.years) {
            let years = [];
            years = this.$route.query.years ? this.$route.query.years.split(',') : [];
            flag = years.findIndex(slug => parseInt(slug) === item.year) > -1;
          }

          if (flag && this.$route.query.actors) {
            let actors = [];
            actors = this.$route.query.actors ? this.$route.query.actors.split(',') : [];
            flag = actors.findIndex(slug => actorNames[actorNames.findIndex(tmp => tmp.slug === slug)].name === item.actor) > -1;
          }

          if (flag && this.$route.query.directors) {
            let directors = [];
            directors = this.$route.query.directors ? this.$route.query.directors.split(',') : [];
            flag = directors.findIndex(slug => directorNames[directorNames.findIndex(tmp => tmp.slug === slug)].name === item.director) > -1;
          }

          return flag;
        })

        this.total = this.cards.length;
        this.cards = this.cards.slice((this.page - 1) * this.perPage, (this.page - 1) * this.perPage + this.perPage);
        this.totalPage = parseInt(this.total / this.perPage) + (this.total % this.perPage ? 1 : 0);
      }/** Method to get cards according to sidebar filter. */
    }
  }
</script>
