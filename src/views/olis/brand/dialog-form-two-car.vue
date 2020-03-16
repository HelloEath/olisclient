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
        ref="rowData"
      >


        <el-form-item
          class="required"
          label="品牌："
          label-width="100px"
          prop="brand"

        >
          <el-select
            v-model="rowData.brand.id"
            clearable
            @change="brandChange(rowData.brand.id)"
          >
            <el-option
              :label="item.brandName"
              :value="item.id"
              v-for='(item, i) in allBrandList'
              :key='i'>
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item
          class="required"
          label="一级分类："
          label-width="100px"
          prop="one"

        >
          <el-select
            v-model="rowData.one.id"
            clearable
          >
            <el-option
              :label="item.carTypeName"
              :value="item.id"
              v-for='(item, i) in oneCarTypeDetail'
              :key='i'>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          class="required"
          label="二级分类："
          label-width="100px"
          prop="carTypeName"

        >
          <el-input
            v-model="rowData.carTypeName"
            auto-complete="off"
            placeholder="请输入二级分类名称"
          >
          </el-input>
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

  export default {
    name: 'menu-form',
    mixins: [dialogMixin],
    components: { departmentSelect },

    props: {
      title: {
        type: String,
        default: '二级车型管理'
      },
      type: {
        type: String,
        default: 'add'
      },

    },

    data(){
      const checkBrand = (rule, value, callback) => {
        if (value.id){
          callback();
        } else {
          callback(new Error("请选择品牌名称"))
        }
      };

      const checkOne = (rule, value, callback) => {
        if (value.id){
          callback();
        } else {
          callback(new Error("请选择一级车型名称"))
        }
      };

      return{
        rules: {
          brand: [
            {
              required: true,
              message: '请选择品牌名称',
              trigger: 'blur'
            },
            {
              validator: checkBrand,
              trigger: 'blur'
            }
          ],
          one: [{
            required: true,
            message: '请选择一级车型名称',
            trigger: 'blur'
          },
            {
              validator: checkOne,
              trigger: 'blur'
            }
          ],
          carTypeName: [{
            required: true,
            message: '请输入二级车型名称',
            trigger: 'blur'
          },
          ],

        },
        rowData: {
         brand:{
           id:''
         },
          one:{
            id:''
          },
          carTypeName:''
        },
        buttonLoading:false

      }
    },

    created() {
      this.getAllBrandList();
    },
    computed: {
      ...mapGetters([
        'oneCarTypeList',
        'allBrandList',
        'oneCarTypeDetail'
      ]),
    },
    methods: {
      ...mapActions([
        'getAllBrandList',
        'getOneCarList',
        'saveTwoCarTypeDetail',
        'getOneCarTypeDetail'
      ]),
      brandChange(brandId){
        this.oneCarTypeDetail=[];
        this.rowData.one.id=null;
        this.getOneCarTypeDetail(brandId);
      },
      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.saveTwoCarTypeDetail(this.rowData).then(res => {
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
