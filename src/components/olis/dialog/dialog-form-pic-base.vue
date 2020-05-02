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
        :rules="rules"
        :model="rowData"
        label-width="120px"
        ref="rowData"
      >

        <el-form-item class="required" label="名称：" label-width="100px" prop="imgMaterial.materialName">
          <el-input
            v-model="rowData.imgMaterial.materialName"
            auto-complete="off"
            placeholder="请输入名称"
          >


          </el-input>
        </el-form-item>

        <el-form-item
          class="required"
          label="请选择类型："
          prop="imgMaterial.materialType"

        >
          <el-select v-model="rowData.imgMaterial.materialType">
            <el-option :value="1" label="发动机图片">发动机图片</el-option>
            <el-option :value="2" label="机油图片">机油图片</el-option>

          </el-select>
        </el-form-item>


        <el-form-item
          class="required"
          label="图片："

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
        <el-form-item
          class="required"
          label="语音说明："
          label-width="100px"
          prop="imgMaterial.soundDesc"

        >
          <el-input v-model="rowData.imgMaterial.soundDesc"
                    placeholder="请输入提示音"
          ></el-input>
        </el-form-item>

        <div style="margin-bottom: 10px"><h3 style="margin: 0px auto;padding-left: 30px">--------------------如果添加为发动机基础，以下两个可以不填写-------------------</h3></div>

        <el-form-item
          class="required"
          label="行驶公里数："
          prop="imgMaterial.materialKm"

        >
          <el-input v-model="rowData.imgMaterial.materialKm"
                    placeholder="请输入行驶公里数"
          ></el-input>
        </el-form-item>

        <el-form-item
          class="required"
          label="机油销量："
          prop="imgMaterial.materialSales"

        >
          <el-input v-model="rowData.imgMaterial.materialSales"
                    placeholder="请输入机油销量"
          ></el-input>
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
  import departmentSelect from '@/components/department_select'
  import {filePost,server} from "./../../../common/ajax.js"

  export default {
    name: 'menu-form',
    mixins: [dialogMixin],
    components: { departmentSelect },

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
        default: {}
      },
      imageUrl:'',
    },
    data(){
      const checkInfo = (rule, value, callback) => {
      }
      return{
        imgUrlHead:'',
        buttonLoading:false,
        rules: {
          "imgMaterial.materialName": [{
            required: true,
            message: '请输入名称',
            trigger: 'blur'
          },
          ],
          "imgMaterial.materialType": [{
            required: true,
            message: '请选择类型',
            trigger: 'blur'
          },
          ],
          "imgMaterial.soundDesc": [{
            required: true,
            message: '请输入语音说明',
            trigger: 'blur'
          },
          ],
          "imgMaterial.materialKm": [{
            required: true,
            message: '请输入行驶公里数',
            trigger: 'blur'
          },
          ],
          "imgMaterial.materialSales": [{
            required: true,
            message: '请输入机油销量',
            trigger: 'blur'
          },
          ],


        },
      }
    },

    created(){
      this.imgUrlHead = server.substring(0,server.length-1);

    },
    methods: {
      ...mapActions([
        'saveImgBaseDetail'
      ]),
      setOlis(){

      },
      addSae(){

      },

      beforeUpload(file) {
        let fd = new window.FormData();
        fd.append('file', file, file.name)
        filePost('brand/brandLogo',fd).then(res=>{
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
      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            if (!this.rowData.imgMaterial.uploadFile){
              this.$message.warning('请上传图片');
              this.buttonLoading = false;
              return;
            }
            this.saveImgBaseDetail(this.rowData).then(res => {
              if (res.code == 0) {
                this.$message.success('信息保存成功');
                this.$emit('refresh');
                this.$emit('update:show', false);
              }
              this.buttonLoading = false;
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
