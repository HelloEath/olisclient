<template>

  <div class="page-wrap">

    <div class="page-main">
      <el-card class="table-card">

        <el-form
          class="rowData"
          :model="rowData"
          :rules="rules"
          ref="rowData"
        >
          <span class="dialog-tips">此 "<i> * </i>" 标记为必填选项，请正确填写内容！</span>

          <el-form-item
            class="required"
            label="地区信息："
            prop="region.id"
            label-width="100px"
            style="margin-top: 20px"
          >
            <department-select
              v-model="rowData.region.id"
              clearable
            >
            </department-select>
          </el-form-item>


          <el-form-item
            class="required"
            label="油品名称："
            prop="imgBase.id"
            label-width="100px"
          >
            <el-select
              v-model="rowData.imgBase.id"
              placeholder="请选择油品名称">
              <el-option
                v-for="(enu, index) in allImgTypeBaseList"
                :key="index"
                :label="enu.imgMaterial.materialName"
                :value="enu.id">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="required"
            label="设置价格："
            prop="olisPrize"
            label-width="100px"
          >
            <el-input
              v-model="rowData.olisPrize"
              auto-complete="off"
              placeholder="请输入价格"
              style="width: 195px"

            >
            </el-input>
          </el-form-item>


          <el-form-item class="btns">
            <el-button
              type="primary"
              @click="save"
              :loading="buttonLoading"
            >
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

  </div>
</template>

<script>
  import departmentSelect from '@/components/department_select'
  import { mapState, mapGetters, mapActions } from 'vuex'

  export default {
    name: 'area-price-manage',
    components: {
      departmentSelect
    },

    data() {

      return {
        formLabelWidth: '100px',
        rules: {
          "region.id": [{
            required: true,
            message: '请输入地区信息',
            trigger: 'blur'
          },
          ],
          "imgBase.id": [{
            required: true,
            message: '请输入油品名称',
            trigger: 'blur'
          },
          ],
          olisPrize: [{
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          },
          ]
        },
        rowData: {
          region:{
            id:''
          },
          imgBase:{
            id:''
          },
          olisPrize: '',

        },
        buttonLoading:false
      }
    },

    created(){
      this.getAllImgBaseListByType({materialType:2});
      this.getAllRegions();
    },
    computed: {
      ...mapGetters([
        'allImgTypeBaseList',
      ]),
    },
    methods: {
      ...mapActions([
        'saveRegionPrizeDetail','getAllImgBaseListByType','getAllRegions'
      ]),
      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.saveRegionPrizeDetail(this.rowData).then(res => {
              if (res.code == 0) {
                this.buttonLoading = false;
                this.$message.success('保存成功');
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
  .page-wrap {
    .page-main {
      .rowData{
        width: 23%;
        margin: 0px auto;
      }
      .dialog-tips {
        position: relative;
        width: 100%;
        text-align: center;
        margin-bottom: 18px;
        display: inline-block;
        text-align: center;
        font:12px '微软雅黑';
        color:#333;
        i {
          color:#f00;
          font-style: normal;
        }
      }
      .btns{
        width: 75px;
        margin: 0px auto;
      }
      .el-table__row {
        .el-button--text {
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
  }
</style>


