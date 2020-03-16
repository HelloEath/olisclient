<template>
  <el-pagination
    background layout="total, prev, pager, next"
    :page-size="10" 
    :total="all" 
    :current-page="pageNo"
    @current-change="currentChange">
  </el-pagination>
</template>
<script>
  export default {
    name: 'pagenation',
    props:['total','pageNo'],
    data () {
      return {

      }
    },
    computed:{
      all () {
        return this.total
      }
    },
    mounted(){
    },
    methods:{
      currentChange (val) {
        this.$emit('currentChange', val)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>

