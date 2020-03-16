<template>
  <div>
    <el-upload
      :action="uploadUrl"
      with-credentials
      ref='upload'
      list-type="text"
      v-if="type"
      :on-success="handleAvatarSuccess"
      :before-upload='beforeUpload'
      :on-remove="handleRemove"
      :file-list="fileList">
      <span>点击上传附件</span>
    </el-upload>
    <div v-else>
      <div class="attachments-list" v-if="fileList.length>0">
        <div class="attachments-item" v-for="(item, i) in fileList" :key="i">
          <span>{{item.uploadFile.originFileName}}</span>
          <el-button
            size="mini"
            type="text"
            class="attachments-btn"
            @click="handleDownload(imgUrlHead+item.uploadFile.fileCode)">
            下载
          </el-button>
        </div>
      </div>
      <div class="attachments-list" v-else>无</div>
    </div>
  </div>
</template>
<script>
  import { server, filePost } from "./../../common/ajax.js"
  export default {
    name: "upload-attachments",
    components: {},
    data () {
      return {
        imageUrl:'',
        imgUrlHead: server + 'common/download/',
        uploadUrl: server + 'activity/upload',
        fileList: [],
      }
    },
    props: {
      attachments: {
        type: Array,
        default: () => []
      },
      type: {
        type: Boolean,
        default: false
      }
    },
    watch:{
      attachments(val) {
        this.fileList = val;
      }
    },
    computed: {},
    created(){
      this.fileList = this.attachments;
    },
    methods: {
      handleAvatarSuccess(res, file) {
        if (res.code =='0') {
          this.attachments.push(res.data);
        }
      },
      beforeUpload(file) {
        if (file.size < 1) {
          this.$message.warning("上传的附件大小不可为0");
          return false
        }
      },
      handleRemove(file) {
        if (file.status == "success") {
          let id = file.id;
          this.attachments.forEach((val,i)=>{
            if (id == val.id) {
              this.attachments.splice(i, 1);
            }
          })
        }
      },
      handleDownload (data) {
        if (!data) {
            return;
        }
        let url = data;
        let link = document.createElement('a')
        link.style.display = 'none'
        link.href = url
        link.setAttribute('download', this.uploadFileName)
        document.body.appendChild(link)
        link.click();
      },
    }
  }
</script>
<style lang="scss">
.attachments-list {
  min-width: 400px;
  float: left;
  .attachments-item {
    color: #1AA194;
    margin-bottom: 5px;
    .attachments-btn {
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
</style>
