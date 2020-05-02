<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="closeDialog"
    :show="show"
    :modal-append-to-body="false"
  >
    <el-scrollbar style="height: 100%;">
      <span class="dialog-tips">此 "<i> * </i>" 标记为必填选项，请正确填写内容！</span>
      <el-form
        class="rowData"
        :model="rowData"
        :rules="rules"
        :label-width="formLabelWidth"
        ref="rowData"
      >

        <el-form-item
          class="required"
          label="名称："
          label-width="100px"
          prop="imgMaterial.materialName"
        >
          <el-input
            v-model.trim="rowData.imgMaterial.materialName"
            auto-complete="off"
            placeholder="请输入名称"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          class="required"
          label="价格："
          label-width="100px"
          prop="imgMaterial.materialPrize"
        >
          <el-input
            v-model="rowData.imgMaterial.materialPrize"
            auto-complete="off"
            placeholder="请输入价格"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          class="required"
          label="SAE："
          label-width="100px"
        >
          <el-input
            v-model="rowData.imgMaterial.materialSae"
            auto-complete="off"
            placeholder="请输入SAE"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          class="required"
          label="排序："
          label-width="100px"
        >
          <el-input
            v-model="rowData.imgMaterial.materialRank"
            auto-complete="off"
            placeholder="请输入排序"
          >
          </el-input>
        </el-form-item>


        <el-form-item class="required" label="保护油图片" >
          <el-upload
            class="avatar-olis"
            action=""
            :show-file-list="false"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
            :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" class="image-olis">
            <el-button v-else
              type="primary"
            >选择图片
            </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item
          class="required"
          label="API机油："
          label-width="100px"
        >
          <el-input
            v-model="rowData.imgMaterial.materialApiDesc"
            auto-complete="off"
            placeholder="请输入API机油说明"
          >
          </el-input>
        </el-form-item>
        <el-form-item class="btns" >
          <el-button
            type="primary"
            @click="save"
            :loading="buttonLoading">确 定
          </el-button>
          <el-button @click="closeDialog">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getStore } from '@/common/utils'
  import dialogMixin from '@/mixins/dialog'
  import {filePost,server} from "./../../../common/ajax.js"

  export default {
    name: 'menu-form',
    mixins: [dialogMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'add'
      },
      rowData: {
        type: Object,
      },
      imageUrl:''
    },
    data() {
      //数据
      return {
        rules: {
          "imgMaterial.materialName": [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          },
          ],
          "imgMaterial.materialPrize":[{
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          },
          ],
        },
        rolesList: [],
        buttonLoading: false,
        formLabelWidth: '100px',
        imgUrlHead:''
      }
    },
    watch: {

      closeDialog(){
        this.$emit('update:show', false);
        this.clearForm();
      }
    },
    created(){
      this.imgUrlHead = server.substring(0,server.length-1);

    },
    /*computed: {
      imgUrlHead() {
        return server.substring(0,server.length-1);
      }
    },*/
    methods: {
      ...mapActions([
        'saveImgBaseDetail'
      ]),
      //重置表单
      clearForm(){
        this.$refs['rowData'].resetFields();
      },
      beforeUpload(file) {
        let fd = new window.FormData();
        fd.append('file', file, file.name)
        filePost('olis/olisImage',fd).then(res=>{
          this.imageUrl = this.imgUrlHead + res.data.path+"/"+res.data.fileName;
          let uploadFile = {
            "fileName": res.data.fileName,
            "id":res.data.id
          };
          this.rowData.imgMaterial.uploadFile = uploadFile;
          this.$message.success('上传成功');
        })
        return false
      },
      closeDialog(){
        this.$emit('update:show', false);
        this.clearForm();
      },
      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.rowData.imgMaterial.materialType=2;
            if (!this.rowData.imgMaterial.uploadFile){
              this.$message.warning('请上传图片');
              this.buttonLoading = false;
              return;
            }
            this.saveImgBaseDetail(this.rowData).then(res => {
              if (res.code == 0) {
                this.buttonLoading = false;
                this.$message.success('信息保存成功');
                this.$emit('refresh');
                this.$emit('update:show', false);
              }
            })

          } else {
            this.$message.warning('提交失败，请确认修改信息是否有错漏！');
            this.buttonLoading = false;
            return false;
          }
        });

      },

    }
  }
</script>
<style lang="scss">
  .userForm {
    .el-dialog {
      height: 80%;
      .el-dialog__body {
        height: 97%;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .btns{
    .el-form-item__content{
      margin-left: 0px !important;
    }
  }

  .userForm {
    overflow: hidden;
  }
  .el-form {
    padding-right: 10px;
    .avatar-olis{
      .image-olis{
        width: 200px;
      }
    }
  }
  .rowData {
    .el-input,
    .el-select {
      width: 100%;
    }
  }
  .roleBox {
    width: 100%;
    .el-checkbox {
      margin-left: 20px;
    }
    .role_sel {
      display: flex;
      line-height: 30px;
      margin-top: 10px;
      &-tit {
        font: 14px/30px "PingFangSC-Regular", "PingFang SC";
        width: 114px;
        height: 30px;
        background: rgb(242, 242, 242);
        color: #333;
        text-align: center;
      }
      &-list {
        flex: 1;
      }
    }
  }
</style>
