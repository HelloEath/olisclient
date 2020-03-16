<template>

  <div class="page-wrap">

    <div class="page-main">

      <el-card class="page-head" style="position: relative;">
        <el-form
          class="search-form"
          label-width="80px"
          label-position="right"
          style="margin-bottom: 30px"
          size="small">
          <el-col :span="2">
            <el-button
              size="small"
              class="button-item"
              type="primary"
              @click="add">
              添加<i class="el-icon-plus el-icon--right"></i>
            </el-button>
          </el-col>


        </el-form>
      </el-card>
      <div class="page-main">
        <el-card class="table-card">
          <lb-table
            max-height="480"
            :column="tableData.column"
            :data="imgBaseList.content"
            :total="Number(imgBaseList.totalElements)"
            pagination
            background
            border
            :currentPage="currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            @p-current-change="pCurrentChange">
          </lb-table>
        </el-card>
      </div>

      <el-dialog
        title="添加油品价格"
        :visible.sync="isShowDialog">
          <el-form
            class="rowData"
            :model="rowData"
            :rules="rules"
            ref="rowData"
          >
            <span class="dialog-tips">此 "<i> * </i>" 标记为必填选项，请正确填写内容！</span>

            <el-form-item
              class="required"
              label="油品名称："
              prop="id"
              label-width="100px"
            >
              <el-select
                v-model="rowData.id"
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
              prop="imgMaterial.materialPrize"
              label-width="100px"
            >
              <el-input
                v-model="rowData.imgMaterial.materialPrize"
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
                确 定
              </el-button>
            </el-form-item>
          </el-form>

      </el-dialog>


    </div>

  </div>
</template>

<script>
  import departmentSelect from '@/components/department_select'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import LbTable from '@/components/lb-table/lb-table'

  export default {
    name: '233-price-manage',
    components: {
      departmentSelect,LbTable
    },

    data() {
      return {
        tips:'12',
        isShowDialog:false,
        formLabelWidth: '100px',
        currentPage:1,
        keyword:{},
        rules: {
          "id": [{
            required: true,
            message: '请选择油品名称',
            trigger: 'blur'
          },
          ],
          "imgMaterial.materialPrize": [{
            required: true,
            message: '请输入价格',
            trigger: 'blur'
          },
          ]
        },
        rowData: {
          id:'',
          imgMaterial:{
            materialPrize:"",
            materialType:2
          }
        },
        dialogForm: {
          title: '',
          type: '',
          rowData: {},
          dialogVisible: false
        },
        buttonLoading:false,
        tableData: {
          column: [
            {
              prop: 'imgMaterial.materialName',
              label: '油品',
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialName || '无' }</span>
              }
            },
            {
              prop: 'imgMaterial.materialPrize',
              label: '价格',
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialPrize || '无' }</span>
              }
            },
            {
              label: '操作',
              render: (h, scope) => {
                return (
                  <div>
                  <el-button
                type="text"
                size="mini"
                onClick={ () => { this.edit(scope.row) } }>
                编辑
                </el-button>

                </div>
              )
              }
            }
          ]
        }
      }
    },

    created(){
      this.getAllImgBaseListByType({materialType:2});
      this.getImgBaseList({ pageNo: 1,materialType:2 });

    },

    computed: {
      ...mapGetters([
        'allImgTypeBaseList','imgBaseList'
      ]),
    },
    methods: {
      ...mapActions([
        'updateOlisPrize','getAllImgBaseListByType','getImgBaseList'
      ]),
      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.updateOlisPrize(this.rowData).then(res => {
              if (res.code == 0) {
                this.buttonLoading = false;
                this.$message.success('保存成功');
                this.isShowDialog=false;
                this.refreshTextData();
              }
            })

          } else {
            this.$message.warning('提交失败，请确认修改信息是否有错漏！');
            this.buttonLoading = false;
            return false;
          }
        });


      },

      add() {
        this.isShowDialog=true;
        this.rowData= {
          id:'',
            imgMaterial:{
            materialPrize:"",
              materialType:2
          }
        }
      },

      edit(row) {
        this.rowData = JSON.parse(JSON.stringify(row));
        this.isShowDialog = true;
      },


      del(row) {
        this.$confirm('您确定需要删除'+row.imgMaterial.materialName+'吗？', {
          confirmButtonText: '确定删除',
          cancelButtonText: '再考虑下',
          type: 'warning'
        }).then(() => {
          this.deleteImgBase(row.id).then(res=>{
            if(res.code==0){
              this.$message.success('删除成功');
              this.refreshTextData();
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },

      refreshTextData() {
        this.keyword.pageNo = 1;
        this.keyword.materialType=2;//机油类型
        this.getImgBaseList(this.keyword);

      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.keyword.materialType=2;
        this.getImgBaseList(this.keyword);
      },

      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        //this.keyword = Object.assign({}, val)
        this.keyword.materialName=val.keyWorlds;
        this.keyword.pageNo = 1;
        this.keyword.materialType=2;
        this.getImgBaseList(this.keyword);
      }

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
        width: 50%;
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
        width: 100px;
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


