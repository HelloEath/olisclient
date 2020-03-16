import { mapActions } from 'vuex'
const { body } = document
const WIDTH = 1024 // refer to Bootstrap's responsive design

export default {
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    if (isMobile) {
      this.toggleAppMain(true);
    }
  },
  methods: {
    ...mapActions(['toggleAppMain']),
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        if (isMobile) {
          this.toggleAppMain(true);
        } else {
          this.toggleAppMain(false);
        }
      }
    }
  }
}
