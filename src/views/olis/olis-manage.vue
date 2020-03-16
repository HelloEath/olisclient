<template>
  <div class="page-wrap">
    <page-head
      :tips="tips"
      @add="add"
      @searchFilter="searchFilter">
    </page-head>
    <div class="page-main">
      <el-card class="table-card">
        <lb-table
          max-height="550"
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

    <dialog-form
      :title="dialogForm.title"
      :type="dialogForm.type"
      :rowData="dialogForm.rowData"
      @refresh="refreshTextData"
      :imageUrl="imageUrl"
      :show.sync="dialogForm.dialogVisible">
    </dialog-form>
  </div>
</template>

<script>
  import pageHead from '../../components/olis/common/page_head_manege'
  import LbTable from '@/components/lb-table/lb-table'
  import dialogForm from '../../components/olis/dialog/dialog-form-olis-manage'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { getStore } from '@/common/utils.js'
  import {server} from "./../../common/ajax.js"

  export default {
    name: 'activityIndexEntry',

    components: {
      pageHead,
      LbTable,
      dialogForm
    },

    data() {
      return {
        tips:'请输入搜索条件',
        dialogForm: {
          title: '',
          type: '',
          rowData: {},
          dialogVisible: false
        },
        imageUrl:'',
        keyword: {},
        eventId: '',
        logErrorShow: false,
        currentPage: 1,
        imgUrlHead:'',
        tableData: {
          column: [
            {
              prop: 'imgMaterial.materialName',
              label: '名称',
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
              prop: 'imgMaterial.materialSae',
              label: 'SAE',
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialSae || '无' }</span>
              }
            },
            {
              prop: 'imgMaterial.materialRank',
              label: '排序',
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialRank || '无' }</span>
              }
            },
            {
              prop: 'uploadFile',
              label: '图片',
              render: (h, scope) => {
                return (
                  <el-popover placement="right" title="" trigger="hover">
                  <el-image
                style="height: 500px;width: 500px"
                src={this.imgUrlHead+(scope.row.imgMaterial.uploadFile?`${scope.row.imgMaterial.uploadFile.path}/${scope.row.imgMaterial.uploadFile.fileName}`:'')}              ></el-image>

                <el-image
                style="width: 70px;height:50px" slot="reference"
                src={this.imgUrlHead+(scope.row.imgMaterial.uploadFile?`${scope.row.imgMaterial.uploadFile.path}/${scope.row.imgMaterial.uploadFile.fileName}`:'')}              ></el-image>
                </el-popover>
              )
              }
            },
            {
              prop: 'imgMaterial.materialSales',
              label: '销量',
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialSales|| '0' }</span>
              }
            },
            {
              prop: 'imgMaterial.materialKm',
              label: '公里数',
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialKm|| '0' }</span>
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
                <el-button
                type="text"
                size="mini"
                // disabled="scope.row.id === 1"
                onClick={ () => { this.del(scope.row) } }>
                删除
                </el-button>
                </div>
              )
              }
            }
          ]
        }
      }
    },

    created() {
      this.getImgBaseList({ pageNo: 1,materialType:2 });
      this.imgUrlHead=server.substring(0,server.length-1);
    },

    computed: {
      ...mapGetters([
        'imgBaseList',
      ]),
      /*imgUrlHead() {
          return server.substring(0,server.length-1);
      }*/

    },

    methods: {
      ...mapActions([
        'getImgBaseList','deleteImgBase'

      ]),

      add() {
        this.dialogForm.title = '保护油管理';
        this.dialogForm.type = 'add';
        this.dialogForm.rowData = {
          imgMaterial:{
            materialName:'',
            materialPrize:'',
            materialSae:'',
            materialRank:'',
            materialApiDesc:''
          },
        }
        this.imageUrl='';
        this.dialogForm.dialogVisible = true;
      },

      edit(row) {
        this.dialogForm.title = '编辑信息';
        this.dialogForm.type = 'edit';
        this.dialogForm.rowData = JSON.parse(JSON.stringify(row));
        this.imageUrl=this.imgUrlHead+(this.dialogForm.rowData.imgMaterial.uploadFile? (this.dialogForm.rowData.imgMaterial.uploadFile.path+"/"+this.dialogForm.rowData.imgMaterial.uploadFile.fileName):"");
        this.dialogForm.dialogVisible = true;
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
    },
  }
</script>
<style lang="scss">
  .page-wrap {
    .page-main {
      .el-table__row {
        .el-button--text {
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
  }
</style>



