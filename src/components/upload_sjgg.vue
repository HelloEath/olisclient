<template>
  <div class="adUpload">
    <el-upload
      :class="{disabled:uploadDisabled}"
      :action="uploadUrl"
      list-type="picture-card"
      enctype="multipart/form-data"
      with-credentials
      :limit="limitNum"
      :file-list="fileList"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :accept="'image/*'">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="查看图片">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>
<script>
  import { server,filePost } from "./../common/ajax.js"
  export default {
    data () {
      return {
        imageUrl:'',
        uploadUrl: server + 'activity/upload-image',
        fileList: [],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    props: ['adItem', 'limitNum', 'uploadFiles'],
    watch:{
      uploadFiles(val){
        this.initFileList(val);
      }
    },
    computed: {
      uploadDisabled:function() {
          return this.fileList.length >= this.limitNum;
      },
    },
    mounted(){
      this.initFileList(this.uploadFiles);
    },
    methods: {
      initFileList(uploadFiles) {
        if(uploadFiles&&uploadFiles.length){
          this.fileList = [];
          uploadFiles.forEach(val=>{
            let item = val;
            item.url = server + 'common/static/' + val.fileCode;
            this.fileList.push(item);
          })
        } else {
          this.fileList = [];
        }
      },
      beforeUpload(file) {
        const isAd = this.adItem.adPosition ? true : false;
        /*判断是否选择广告栏位*/
        if(isAd){
          let limitSize = this.adItem.adCapacity.replace(/[^0-9]/ig,"");
          const isLt = file.size / 1024 < Number(limitSize);
          if (!isLt) {
            this.$message.warning(`广告素材图片大小不能超过 ${Number(limitSize)} kb!`);
            return isLt;
          }
        }else{
          this.$message.warning('上传广告素材前请先选择广告栏位');
          return isAd;
        }
      },
      handleAvatarSuccess(res, file) {
        console.log(res);
        console.log(file);
        if (res.code == '0') {
          let data = res.data;
          this.adItem.uploadFiles.push(data);
          this.$message.success('上传成功');
        }
      },
      beforeRemove() {},
      handleRemove(file, fileList) {
        let id = file.id;
        this.adItem.uploadFiles.forEach((val,i)=>{
          if (id == val.id) {
            this.adItem.uploadFiles.splice(i, 1);
          }
        })
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    }
  }
</script>
<style lang="scss">
  .adUpload {
    display: flex;
    align-items: flex-end;
    .disabled .el-upload--picture-card {
      display: none;
    }
    .el-upload {
      position: relative;
      .imageAvatar {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        max-width: 100%;
        max-height: 100%;
        outline: none;
      }
    }
  }
</style>
