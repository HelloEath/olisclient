<template>
    <el-dialog
    :title="textMap[textType]"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :show="show"
    class="addText"
    :modal-append-to-body="false">
      <el-form :model="itemData" ref="itemData">
        <el-form-item class="required" label="素材名称" :label-width="formLabelWidth">
          <el-input clearable v-model="itemData.name" auto-complete="off" placeholder="最多只能输入50位" :maxLength="50"></el-input>
        </el-form-item>
        <el-form-item class="required dateList" label="文本内容" :label-width="formLabelWidth">
          <el-input clearable type="textarea" v-model="itemData.content" :maxLength="1000"></el-input>
        </el-form-item>
        <el-form-item class="required channelList" label="渠道信息" :label-width="formLabelWidth">
          <el-checkbox-group v-model="itemData.channelNames">
            <el-checkbox v-for="channel in enumerate.channelNames" :label="channel.value" :key="channel.value">{{channel.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item class="required channelList" label="活动类型" :label-width="formLabelWidth">
            <el-checkbox-group clearable v-model="itemData.activityType">
              <el-checkbox v-for="item in enumerate.activityType" :label="item.name" :value="item.value" :key="item.value"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item class="btns">
          <el-button @click="closeDialog">取 消</el-button>
          <el-button v-if="textType=='create'" type="primary" @click="createData">确 定</el-button>
          <el-button v-else type="primary" @click="updateData">修改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
</template>
<script>
  import { required, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
  import * as enumerate from '../../setting/enumerate/enumerate.js'
  import { mapActions } from 'vuex'
  import { setStore } from './../../common/utils.js'
  import dialogMixin from './../../mixins/dialog'
  export default {
    name: 'userIndex',
    mixins: [dialogMixin],
    props: ['itemData','textType'],
    data () {
      return {
        enumerate,
        checkAll: false,
        isIndeterminate:true,
        textMap: {
          update: "修改文本素材",
          create: "新建文本素材"
        },
        dialogNewVisible:false,
        formLabelWidth: '120px'
      }
    },
    methods: {
      ...mapActions(['seveTextMaterial','getTextMaterial',]),
      checkData(){
       let flag = true;
       let obj = this.itemData;
       for(let key in obj){
          if(!obj[key]){
              flag = false;
          }
          if(Array.isArray(obj[key])&&obj[key].length==0){
            flag = false
          }
       }
       return flag;
      },
      createData(){
        if(!this.checkData()){
          this.$message.warning('请先完善页面信息');
          return;
        }
        this.seveTextMaterial(this.itemData).then((res)=>{
          if(res.code==0){
              this.$emit('refreshTextData');
              this.$message.success('保存成功');
          }
        })
        this.$emit('update:show', false);
        this.$refs['itemData'].resetFields();
      },
      updateData(){
        this.seveTextMaterial(this.itemData).then((res)=>{
          if(res.code==0){
            this.$emit('refreshTextData');
            this.$message.success('保存成功');
          }
        })
        this.$emit('update:show', false);
        this.$refs['itemData'].resetFields();
      },
      closeDialog(){
        this.$emit('update:show', false);
        this.$refs['itemData'].resetFields();
      }
    }
  }
</script>
<style lang="scss">
  @import './../../assets/css/user';
  .addText {
    .el-form-item {margin-bottom: 15px!important;}
    &-txt {
        position:relative;
        top: -24px;
        padding-left: 20px;
    }
    .el-input {
        width:300px;
        height:27px;
        line-height:27px;
    }
    .dateList {
       .el-input {
            width:132px;
            height:27px;
            line-height:27px;
        }
    }
    .channelList {
        .el-checkbox__label {
            padding-left:5px;
        }
    }
    .btns {
        text-align:center;
        padding-bottom:20px;
        .el-button {
            width:140px;
            height:40px;
        }
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 4px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #1AA194;
      }
      .avatar-uploader-icon {
        font-size: 18px;
        color: #8c939d;
        width: 300px;
        height: 27px;
        line-height: 27px;
        text-align: center;
      }
      .avatar {
        width: 300px;
        height: 27px;
        display: block;
      }
  }
</style>
