<template>
  <div><el-dialog
    :title="title"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :show="show"
    :modal-append-to-body="false"
  >


  </el-dialog></div>
</template>

<script>
    export default {
        name: "olisList"
    }
</script>

<style scoped>

</style>
