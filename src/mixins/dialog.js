export default {
  props:['show'],
  data () {
      return {
          visible: this.show
      };
  },
  watch: {
    show () {
        this.visible = this.show;
    },
    closeDialog(){
        this.$emit('update:show', false)
    }
  },
  methods: {
    closeDialog(){
        this.$emit('update:show', false)
    }
  }
}
