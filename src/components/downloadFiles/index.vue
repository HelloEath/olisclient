<template>
  <el-button
    type="primary"
    size="mini"
    round
    class="downloadFiles"
    @click="uploadFileLoad">
    一键下载附件
  </el-button>
</template>
<script>
export default {
  components: {},
  data () {
    return {
    }
  },
  methods: {
    uploadFileLoad() {
      this.$emit("download");
    }
  }
}
</script>
