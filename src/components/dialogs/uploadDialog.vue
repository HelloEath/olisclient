<template>
    <el-dialog
    :title="textMap[textType]"
    :visible.sync="visible"
    @close="closeDialog"
    :show="show"
    class="addImg"
    :modal-append-to-body="false">
      <el-form :model="fileMessage" ref="fileMessage" :disabled="textType=='view'">
        <div v-if="textType!='view'" class="addImg-txt">提示：每次限制传1张图片</div>
        <el-form-item class="required" label="素材名称" :label-width="formLabelWidth">
          <el-input 
              v-model="fileMessage.name" 
              auto-complete="off" 
              placeholder="最多只能输入50位" 
              :maxLength="50">
          </el-input>
        </el-form-item>
        <el-form-item class="required dateList" label="可用时间范围" :label-width="formLabelWidth">
          <el-date-picker
            v-model="fileMessage.dateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="required channelList" label="渠道信息" :label-width="formLabelWidth">
          <el-checkbox-group v-model="fileMessage.channelNames">
            <el-checkbox 
                v-for="channel in enumerate.channelNames" 
                :label="channel.value" 
                :key="channel.value">
                {{channel.name}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="required" label="版权信息" :label-width="formLabelWidth">
          <el-input 
              v-model="fileMessage.version" 
              auto-complete="off" 
              placeholder="" 
              :maxLength="50">
          </el-input>
        </el-form-item>
        <el-form-item class="required" label="图片尺寸" :label-width="formLabelWidth">
          <el-input 
              v-model="fileMessage.imgSize" 
              auto-complete="off" 
              placeholder="" 
              :maxLength="50">
          </el-input>
        </el-form-item>
        <el-form-item class="required" label="选择文件位置" :label-width="formLabelWidth">
          <el-upload
            v-if="textType!='view'"
            class="avatar-uploader"
            action=""
            :show-file-list="false"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
            :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <div v-else class="displayImg"><img :src="displayImage" draggable="false" preview="1" preview-text=""></div>
        </el-form-item>
        <el-form-item class="btns" v-if="textType!='view'">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button type="primary" @click="saveData" :disabled="isDisable">确 定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>
<script>
  import { server } from "../../common/ajax.js"
  import * as enumerate from '../../setting/enumerate/enumerate.js'
  import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
  import { mapActions } from 'vuex'
  import {filePost} from "./../../common/ajax.js"
  import dialogMixin from './../../mixins/dialog'
  export default {
    name: 'userIndex',
    mixins: [dialogMixin],
    props: ['id','fileMessage','textType','displayImage'],
    data () {
      return {
        textMap: {
          view: "图片素材信息",
          create: "新增图片素材"
        },
        enumerate,
        imageUrl:'',
        uploadUrl:'',
        imgUrlHead:'',
        formLabelWidth: '120px',
        isDisable: false
      }
    },
    created(){
      this.uploadUrl = server + 'resources/upload';
      this.imgUrlHead = server + 'common/static/';
    },
    watch: {
        closeDialog(){
          this.$emit('update:show', false);
          this.clearForm();
        }
    },
    methods: {
      ...mapActions(['seveNewTextMaterial','getImgPath']),
      checkData(){
        let flag = true;
        let obj = this.fileMessage;
       for(let key in obj){
        console.log(obj);
          if(!obj[key]){
            flag = false;
          }
          if(Array.isArray(obj[key])&&obj[key].length==0){
            flag = false
          }
       }
        return flag;
      },
      clearForm(){
        //重置表单
        this.dateTime = '';
        this.imageUrl = '';
        this.$refs['fileMessage'].resetFields();
      },
      saveData(){
        this.isDisable = true;
        if(!this.checkData()){
          this.isDisable = false;
          this.$message.warning('请先完善页面信息');
          return;
        }
        this.fileMessage.availableStart = this.formatDate(this.fileMessage.dateTime[0]);
        this.fileMessage.availableEnd = this.formatDate(this.fileMessage.dateTime[1]);
        this.seveNewTextMaterial(this.fileMessage).then((res)=>{
          if(res.code==0){
              this.$emit("refreshImg");
              this.$message.success('保存成功');
              setTimeout(() => {
                this.isDisable = false
              }, 1000)
          }else{
            this.isDisable = false
          }
        })
        this.$emit('update:show', false);
        this.clearForm();
      },
      closeDialog(){
        this.$emit('update:show', false);
        this.clearForm();
      },
      formatDate(val){
          let date = new Date(val);
          return date.Format('yyyy/MM/dd hh:mm:ss');
      },
      beforeUpload(file) {
        let fd = new window.FormData();
        fd.append('file', file, file.name)
        filePost('resources/upload',fd).then(res=>{
          this.imageUrl = this.imgUrlHead + res.data.fileCode;
          let uploadFile = {
            "fileName": res.data.fileName,
            "id":res.data.id
          };
          this.fileMessage.uploadFile = uploadFile;
          this.$message.success('上传成功');
        })
        return false
      }
    }
  }
</script>
<style lang="scss">
  @import './../../assets/css/user';
  .addImg {
    .el-form {position:relative;padding:10px 0;}
    .el-form-item {margin-bottom: 15px!important;}
    &-txt {
        position: relative;
        top: -15px;
        padding-left: 51px;
    }
    .el-input {
        width:400px;
        height:27px;
        line-height:27px;
    }
    .dateList {
       .el-input {
            width:182px;
            height:27px;
            line-height:27px;
        }
    }
    .channelList {
        .el-checkbox__label {
            padding-left: 5px;
        }
    }
    .btns {
        text-align:center;
        //padding-bottom:20px;
        .el-button {
            width:140px;
            height:40px;
        }
    }
    .displayImg {
      width: 100px;
      height: 100px;
      display: block;
    }
    .displayImg img {
      width:100%;
      height:100%;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #1AA194;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 100px;
      height: 100px;
      line-height: 100px;
      text-align: center;
    }
    .avatar {
      width: 100px;
      height: 100px;
      display: block;
    }
  }
</style>
