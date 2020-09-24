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
          :data="regionList.content"
          :total="Number(regionList.totalElements)"
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

    <el-dialog :visible.sync="olisDialog">
      <el-scrollbar style="height: 100%;">
      <lb-table
          :column="OlistableData.column"
          :data="olisList"
          background
          border
        >
        </lb-table>
      </el-scrollbar>
    </el-dialog>
    <dialog-form
      :title="dialogForm.title"
      :type="dialogForm.type"
      :rowData="dialogForm.rowData"
      @refresh="refreshTextData"
      :show.sync="dialogForm.dialogVisible">
    </dialog-form>
  </div>
</template>

<script>
  import pageHead from '../../../components/olis/common/page_head_manege'
  import LbTable from '@/components/lb-table/lb-table'
  import dialogForm from './dialog-form-area-manage'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { getStore } from '@/common/utils.js'
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
        olisDialog:false,
        currentRegionId:null,
        keyword: {},
        eventId: '',
        logErrorShow: false,
        currentPage: 1,
        olisList:[],
        OlistableData:{
          column: [
            {
              type:'index',
              index:1,
              label:'序号',
              width:"50"

            },
            {
              prop: 'region.materialName',
              label: '油品',
              render: (h, scope) => {
                return <span>{ scope.row.imgBase.imgMaterial.materialName || '无' }</span>
              }
            },
            {
              prop: 'region.olisPrize',
              label: '价格',
              render: (h, scope) => {
                return <span>{ scope.row.olisPrize|| '无' }</span>
              }
            },

            {
              label: "操作",
              render: (h, scope) => {
                return (
                  <div>

                <el-button
                type="text"
                size="mini"
                // disabled="scope.row.id === 1"
                onClick={() => { this.delOlis(scope.row) }}>
                删除
                </el-button>
                </div>
              )
              }
            }
          ]
        },
        tableData: {
          column: [
            {
              type:'index',
              index:1,
              label:'序号',
              width:"50"

            },
            {
              prop: 'regionName',
              label: '地区名称'
            },

            {
              label: "操作",
              render: (h, scope) => {
                return (
                  <div>
                  <el-button
                type="text"
                size="mini"
                onClick={() => { this.watchPrize(scope.row) }}>
                查看价格表
                </el-button>

                  <el-button
                type="text"
                size="mini"
                onClick={() => { this.edit(scope.row) }}>
                编辑
                </el-button>
                <el-button
                type="text"
                size="mini"
                // disabled="scope.row.id === 1"
                onClick={() => { this.del(scope.row) }}>
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
      this.getRegionList(this.keyword);
    },


    watch:{
      "regionOlisList"(val){
        this.olisList=val;
      }
    },
    computed: {
      ...mapGetters([
        "regionList",'regionOlisList'
      ])
    },
    methods: {
      ...mapActions([
        "getRegionList",
        "getRegionDetail",
        "deleteRegion",'getRegionOlis','deleteRegionOlis'
      ]),

      add() {
        this.dialogForm.title = "新增地区";
        this.dialogForm.type = "add";
        this.dialogForm.rowData = {};
        this.dialogForm.dialogVisible = true;
      },

      watchPrize(row){
        this.olisDialog=true;
        this.currentRegionId=row.id;
        this.getRegionOlis(this.currentRegionId);
      },
      delOlis(row){
        this.$confirm(`您确定需要删除吗？`,{
          confirmButtonText: "确定删除",
          cancelButtonText: "再考虑下",
          type: "warning"
        }).then(() => {
          this.deleteRegionOlis(row.id).then(res => {
            if (res.code == 0) {
              this.$message.success("删除成功");
              this.refreshRegionOlisList();
            }
          })
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },
      edit(row) {
        this.dialogForm.title = "编辑地区信息";
        this.dialogForm.type = "edit";
        this.dialogForm.rowData = Object.assign({}, row);
        this.dialogForm.dialogVisible = true;
      },

      del(row) {
        this.$confirm(`您确定需要删除${row.regionName}吗？删除后，该地区将不复存在`, "您确定需要删除该地区吗", {
          confirmButtonText: "确定删除",
          cancelButtonText: "再考虑下",
          type: "warning"
        }).then(() => {
          this.deleteRegion(row.id).then(res => {
            if (res.code == 0) {
              this.$message.success("删除地区成功");
              this.refreshTextData("del");
            }
          })
        }).catch(() => {
          this.$message.info("已取消删除");
        });
      },

      refreshRegionOlisList(){
        this.getRegionOlis(this.currentRegionId);
      },
      refreshTextData(type) {
        if(type === "add") {
          this.keyword = {pageNo: 1};
          this.currentPage = 1;
        };
        this.getRegionList(this.keyword);
      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.getRegionList(this.keyword);
      },

      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        //this.keyword = Object.assign({}, val)
        this.keyword.pageNo = 1;
        this.keyword.regionName=val.keyWorlds;
        this.getRegionList(this.keyword);
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



