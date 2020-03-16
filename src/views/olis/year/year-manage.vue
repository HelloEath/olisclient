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
          :data="yearList.content"
          :total="Number(yearList.totalElements)"
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
  import dialogForm from './dialog-form-year'
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
              prop: 'startYear',
              label: '开始年限'
            },
            {
              prop: 'endYear',
              label: '结束年限'
            },
            {
              prop: 'keyYearWords',
              label: '快捷搜索'
            },

          ]
        }
      }
    },

    created() {
      this.getYearList({ pageNo: 1 });
    },

    computed: {
      ...mapGetters([
        'yearList',
      ]),
    },

    methods: {
      ...mapActions([
        'getYearList',
        'saveYearDetail'
      ]),

      add() {
        this.dialogForm.title = '年限管理';
        this.dialogForm.type = 'add';
        this.dialogForm.rowData = {

        }
        this.dialogForm.dialogVisible = true;
      },

      refreshTextData() {
        this.keyword.pageNo = 1;
        this.getYearList(this.keyword);
      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.getYearList(this.keyword);
      },

      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        //this.keyword = Object.assign({}, val)
        this.keyword.keyYearWords=val.keyWorlds;
        this.keyword.pageNo = 1;
        this.getYearList(this.keyword);
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



