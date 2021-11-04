<template>
    <div
            class="header-search hs-simple"
            ref="results"
    >
        <form
                action="#"
                class="input-wrapper"
                @submit.prevent="submitHandler"
        >
            <input
                    type="text"
                    class="form-control"
                    name="search"
                    aria-label="search-box"
                    autocomplete="off"
                    placeholder="Search..."
                    required
                    v-model="search_term"
                    @input="searchCards"
            />
            <button
                    class="btn btn-search"
                    type="submit"
                    name="search"
            >
                <span class="sr-only">header search button</span>
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>
</template>

<script>

  export default {
    data: function () {
      return {
        search_term: '',
        timeouts: []
      };
    },
    methods: {
      searchCards: function () {
        if (this.search_term.length > -1) {
          var search_term = this.removeXSSAttacks(this.search_term)
            .__html;
          this.timeouts.map(timeout => {
            window.clearTimeout(timeout);
          });
          this.timeouts.push(
            setTimeout(() => {
              this.submitHandler();
            }, 1000)
          );
        } else {
          this.timeouts.map(timeout => {
            window.clearTimeout(timeout);
          });
        }
      }, /** Method to get cards which is matched to search word. */
      removeXSSAttacks: function (html) {
        const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;

        // Removing the <script> tags
        while (SCRIPT_REGEX.test(html)) {
          html = html.replace(SCRIPT_REGEX, '');
        }

        // Removing all events from tags...
        html = html.replace(/ on\w+="[^"]*"/g, '');

        return {
          __html: html
        };
      },
      submitHandler: function () {
        this.$router.push({
          path: this.$route.path,
          query: {search: this.search_term, page: 1}
        });/** If you click on submit button, search query will be pushed */
      }
    }
  };
</script>
