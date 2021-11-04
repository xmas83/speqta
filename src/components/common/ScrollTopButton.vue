<template>
    <a
            href="javascript:;"
            title="Top"
            role="button"
            class="scroll-top"
            :class="{show: isFixed}"
            @click="toTop"
    ><i class="fas fa-arrow-up"></i></a>
</template>

<script>
  import {scrollHandler} from '../../utils';

  export default {
    data: function () {
      return {
        isFixed: false
      }
    },
    mounted: function () {
      window.addEventListener('scroll', this.showButtonHandler, true);
    },
    destroyed: function () {
      window.removeEventListener('scroll', this.showButtonHandler, true);
    },
    methods: {
      showButtonHandler: function () {
        if (window.pageYOffset > 600) {
          this.isFixed = true;
        } else {
          this.isFixed = false;
        } /* Methods to decide whether to show scroll-top button or not. */
      },
      toTop: function () {
        scrollHandler(15, 0);
      }
    }
  }
</script>
