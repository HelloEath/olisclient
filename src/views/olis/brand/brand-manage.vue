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
          :data="brandList.content"
          :total="Number(brandList.totalElements)"
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
      :imageUrl="imageUrl"
      @refresh="refreshTextData"
      :show.sync="dialogForm.dialogVisible">
    </dialog-form>
  </div>
</template>

<script>
  import pageHead from '../../../components/olis/common/page_head_manege.vue'
  import LbTable from '@/components/lb-table/lb-table'
  import dialogForm from './dialog-form-brand'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { getStore } from '@/common/utils.js'
  import {server} from "./../../../common/ajax.js"

  export default {
    name: 'brand-manage',

    components: {
      pageHead,
      LbTable,
      dialogForm
    },

    data() {
      return {
        tips:'请输入品牌名称',
        dialogForm: {
          title: '',
          type: '',
          rowData: {},
          dialogVisible: false
        },
        keyword: {},
        eventId: '',
        logErrorShow: false,
        currentPage: 1,
        imageUrl:'',
        tableData: {
          column: [
            {
              type:"index",
              index:1,
              label:"序号",
              width:"50"
            },
            {
              prop: 'brandName',
              label: '品牌'
            },
            {
              prop: 'uploadFile',
              label: '图片',
              render: (h, scope) => {
                return (
                  <el-popover placement="right" title="" trigger="hover">
                  <el-image
                style="height: 300px;width: 300px"
                src={this.imgUrlHead+(scope.row.uploadFile?`${scope.row.uploadFile.path}/${scope.row.uploadFile.fileName}`:'')}
              ></el-image>

                  <el-image
                style="width: 70px;height:50px" slot="reference"
                src={this.imgUrlHead+(scope.row.uploadFile?`${scope.row.uploadFile.path}/${scope.row.uploadFile.fileName}`:'')}
              ></el-image>
                  </el-popover>
              )
              }
            },
            {
              prop: 'name',
              label: '提示音'
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
    created(){
      this.getBrandList({ pageNo: 1 });
      this.imgUrlHead = server.substring(0,server.length-1);

    },

    computed: {
      ...mapGetters([
        'brandList',
      ]),
    },

    methods: {
      ...mapActions([
        'getBrandList',
        'deleteBrand'
      ]),

      add() {
        this.dialogForm.title = '品牌管理';
        this.dialogForm.type = 'add';
        this.dialogForm.rowData = {}
        this.imageUrl='';
        this.dialogForm.dialogVisible = true;
      },

      edit(row) {
        this.dialogForm.title = '编辑品牌信息';
        this.dialogForm.type = 'edit';
        this.dialogForm.rowData = JSON.parse(JSON.stringify(row));
        this.dialogForm.dialogVisible = true;
        this.imageUrl=this.imgUrlHead+(this.dialogForm.rowData.uploadFile? (this.dialogForm.rowData.uploadFile.path+"/"+this.dialogForm.rowData.uploadFile.fileName):"");
      },

      del(row) {
        this.$confirm('您确定需要删除'+row.brandName+'吗？', {
          confirmButtonText: '确定删除',
          cancelButtonText: '再考虑下',
          type: 'warning'
        }).then(() => {
          this.deleteBrand(row.id).then(res=>{
            if(res.code==0){
              this.$message.success('删除信息成功');
              this.refreshTextData();
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },

      refreshTextData() {
        this.keyword.pageNo = 1;
        this.getBrandList(this.keyword);
      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.getBrandList(this.keyword);
      },

      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        //this.keyword = Object.assign({}, val)
        this.keyword.brandName=val.keyWorlds;
        this.keyword.pageNo = 1;
        this.getBrandList(this.keyword);
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



