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
          :data="engineTypeList.content"
          :total="Number(engineTypeList.totalElements)"
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
      :show.sync="dialogForm.dialogVisible">
    </dialog-form>
  </div>
</template>

<script>
  import pageHead from '../../../components/olis/common/page_head_manege'
  import LbTable from '@/components/lb-table/lb-table'
  import dialogForm from './dialog-form-engine-type'
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
        tips:'请输入发动机类型',
        dialogForm: {
          title: '',
          type: '',
          rowData: {
            year:{
              id:''
            }},
          dialogVisible: false
        },
        keyword: {},
        eventId: '',
        logErrorShow: false,
        currentPage: 1,
        tableData: {
          column: [
            {
              type:'index',
              index:1,
              label:'序号',
              width:"50"

            },
            {
              prop: 'year.keyYearWords',
              label: '年限',
              render: (h, scope) => {
                return <span>{ scope.row.year.keyYearWords || '无' }</span>
              }
            },
            {
              prop: 'engineTypeName',
              label: '发动机类型'
            },

          ]
        }
      }
    },

    created() {
      this.getEngineTypeList({ pageNo: 1 });
    },

    computed: {
      ...mapGetters([
        'engineTypeList',
      ]),
    },

    methods: {
      ...mapActions([
       'getEngineTypeList'
      ]),

      add() {
        this.dialogForm.title = '发动机类型管理';
        this.dialogForm.type = 'add';
        this.dialogForm.rowData = {
          year:{
            id:''
          }
        }
        this.dialogForm.dialogVisible = true;
      },

      refreshTextData() {
        this.keyword.pageNo = 1;
        this.getEngineTypeList(this.keyword);
      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.getEngineTypeList(this.keyword);
      },

      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        //this.keyword = Object.assign({}, val)
        this.keyword.engineTypeName=val.keyWorlds;
        this.keyword.pageNo = 1;
        this.getEngineTypeList(this.keyword);
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



