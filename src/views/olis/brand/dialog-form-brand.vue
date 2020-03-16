<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
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
          label="排序："
          prop="brandFistName"
          label-width="100px"

        >
          <el-input
            v-model="rowData.brandFistName"
            auto-complete="off"
            placeholder="请输入排序(字母大写 例如：A)"
          >
          </el-input>
        </el-form-item>
        <el-form-item
          class="required"
          label="品牌名称："
          prop="brandName"
          label-width="100px"

        >
          <el-input
            v-model="rowData.brandName"
            auto-complete="off"
            placeholder="请输入品牌名称"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          class="required"
          label="提示音："
          label-width="100px"

        >
          <el-input
            v-model="rowData.brandSound"
            auto-complete="off"
            placeholder="请输入提示音"
          >
          </el-input>
        </el-form-item>



        <el-form-item
          class="required"
          label="LOGO："
          label-width="100px"

        >
          <el-upload
            class="avatar-olis"
            action=""
            :show-file-list="false"
            accept=".jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP"
            :before-upload="beforeUpload">
            <img v-if="imageUrl" :src="imageUrl" style=" width: 200px;height: 200px">
            <el-button v-else
                       type="primary"
            >选择图片
            </el-button>
          </el-upload>
        </el-form-item>


        <el-form-item class="btns" >
          <el-button
            type="primary"
            @click="save"
            :loading="buttonLoading">确 定
          </el-button>
          <el-button @click="$emit('update:show', false)">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
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
        default: '品牌管理'
      },
      type: {
        type: String,
        default: 'add'
      },
      rowData: {
        type: Object,
        default: {
          brandFistName: '',
          brandName: '',
          brandSound: '',
          brandLogo: null,
        }
      },
      imageUrl:'',

    },
    data() {
      //验证品牌唯一性
      const checkBrandName = (rule, value, callback) => {
        let id = this.rowData.id || '';
        axios.get('validate/uniqueBrand?brandName=' + value + '&oldId=' + id).then((res) => {
          if (!res.data) {
            callback(new Error('品牌已存在！！！'));
          } else {
            callback();
          }
        })
      };

      //数据
      return {
        rules: {
          brandFistName: [
            {
              required: true,
              pattern:/^[A-Z]w{0}$/,
              message: '只能输入一个大写字母',
              trigger: 'blur'
            }
          ],
          brandName: [{
            required: true,
            message: '请输入品牌名称',
            trigger: 'blur'
          },
            {
              validator: checkBrandName,
              trigger: 'blur'
            }
          ],

        },
        rolesList: [],
        buttonLoading: false,
        formLabelWidth: '100px'
      }
    },

    created(){
      this.imgUrlHead = server.substring(0,server.length-1);

    },

    methods: {
      ...mapActions([
        'saveBrandDetail'
      ]),
      beforeUpload(file) {
        let fd = new window.FormData();
        fd.append('file', file, file.name)
        filePost('brand/brandLogo',fd).then(res=>{
          this.imageUrl = this.imgUrlHead + res.data.path+"/"+res.data.fileName;
          console.log("imageUrl="+this.imageUrl)
          let uploadFile = {
            "fileName": res.data.fileName,
            "id":res.data.id
          };
          this.rowData.uploadFile = uploadFile;
          this.$message.success('上传成功');
        })
        return false
      },
      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            if (!this.rowData.uploadFile){
              this.$message.warning('请上传图片');
              this.buttonLoading = false;
              return;
            }
            this.saveBrandDetail(this.rowData).then(res => {
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
