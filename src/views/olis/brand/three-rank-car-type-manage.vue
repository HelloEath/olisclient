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
          :data="threeCarTypeList.content"
          :total="Number(threeCarTypeList.totalElements)"
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
  import dialogForm from './dialog-form-three-car'
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
        tips:'请输入三级类型名称',
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
              type: 'index',
              label: '序号',
              index:1,
              width:"50"
            },
            {
              prop: 'two.one.carTypeName',
              label: '一级类型名称',
              render: (h, scope) => {
                return <span>{scope.row.two && scope.row.two? scope.row.two.one.carTypeName : '无' }</span>
              }
            },
            {
              prop: 'two.carTypeName',
              label: '二级类型名称',
              render: (h, scope) => {
                return <span>{scope.row.two? scope.row.two.carTypeName : '无' }</span>
              }
            },
            {
              prop: 'carTypeName',
              label: '三级类型名称',

            },
            {
              prop: 'phone',
              label: '三级车型语音播报'
            },

          ]
        }
      }
    },

    created() {
      this.getThreeCarList({ pageNo: 1 });
    },

    computed: {
      ...mapGetters([
        'threeCarTypeList',
      ]),
    },

    methods: {
      ...mapActions([
        'getThreeCarList',
      ]),

      add() {
        this.dialogForm.title = '三级车型管理';
        this.dialogForm.type = 'add';
        this.dialogForm.rowData = {
          carTypeName: '',
          threeCarVoice:'',
          brand:{
            id:null
          },
          one: {
            id: null
          },
          two: {
            id: null
          },
        }
        this.dialogForm.dialogVisible = true;
      },


      refreshTextData() {
        this.keyword.pageNo = 1;
        this.getThreeCarList(this.keyword);
      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.getThreeCarList(this.keyword);
      },

      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        //this.keyword = Object.assign({}, val)
        this.keyword.carTypeName=val.keyWorlds;
        this.keyword.pageNo = 1;
        this.getThreeCarList(this.keyword);
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



