<template>
  <div><el-dialog
    :title="title"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :show="show"
    :modal-append-to-body="false"
  >

fgrrtt
  </el-dialog></div>
</template>

<script>
    export default {
        name: "dialog-form-olis-list",
      props: {
        title: {
          type: String,
          default: ''
        },
        type: {
          type: String,
          default: 'add'
        },
        rowData:{},
      },
    }
</script>

<style scoped>

</style>
