<template>
  <div class="page-wrap">
    <page-head @search="searchFilter" @del="deleteLogs"></page-head>
  
    <div class="page-main"
    v-loading="loading">
        <el-card class="table-card">
          <lb-table 
            :column="tableData.column"
            :data="logData.content"
            :total="Number(logData.totalElements)"
            pagination
            background
            border
            :currentPage="currentPage"
            :page-size="20"
            layout="total, prev, pager, next"
            @p-current-change="pCurrentChange">
          </lb-table>
        </el-card>
    </div>

    <system-log-error :eventId="eventId" :show.sync="logErrorShow"></system-log-error>
  </div>
</template>

<script>
import pageHead from './page_head.vue'
import LbTable from '@/components/lb-table/lb-table'
import {mapGetters, mapActions} from 'vuex'
import systemLogError from '@/components/dialogs/systemLogError'

export default {
  name: 'systemLog',
  components: {
    pageHead,
    LbTable,
    systemLogError
  },
  data () {
    return {
      keyword: {},
      eventId: '',
      logErrorShow: false,
      currentPage: 1,
      loading: false,
      tableData: {
        column: [
          {
            type: 'expand',
            render: (h, props) => {
              return (
                <el-form
                  inline
                  label-position="left"
                  class="table-expand-form">
                  <el-form-item label="详细信息：">
                    <span>{ props.row.formattedMessage }</span>
                  </el-form-item>
                </el-form>
              )
            }
          },
          {
            prop: 'timestmp',
            label: '操作时间',
            render: (h, scope) => {
              return <span>{ this.$options.filters.formatTime2(scope.row.timestmp) }</span>
            }
          },
          {
            prop: 'levelString',
            label: '日志信息',
            render: (h, scope) => {
              if (scope.row.levelString === 'ERROR') {
                return <span>
                  <i
                    class="el-icon-warning"
                    onClick={ () => { this.handleError(scope.row) } }
                    style="color: red; margin-left: 10px;cursor: pointer;">
                  </i>
                </span>
              } else {
                return <span>{ scope.row.levelString }</span>
              }
            }
          },
          {
            prop: 'arg0',
            label: '部门'
          },
          {
            prop: 'arg1',
            label: '用户名'
          },
          {
            prop: 'arg2',
            label: '接口名'
          },
          {
            prop: 'arg3',
            label: '参数'
          }
        ]
      }
    }
  },

  created () {
    this.initPage()
  },
  computed: {
    ...mapGetters([
      'logData'
    ])
  },
  methods: {
    ...mapActions([
      'getLogs',
      'getLogError',
      'delLogs'
    ]),
    handleError (row) {
      this.eventId = row.eventId
      this.logErrorShow = true
    },
    initPage () {
      this.getLogs(this.keyword)
    },
    // 分页当前页码值改变时请求对应列表数据
    pCurrentChange (val) {
      this.currentPage = val
      this.keyword.pageNo = val
      this.getLogs(this.keyword)
    },
    // 列表过滤
    searchFilter (val) {
      this.currentPage = 1
      this.keyword = Object.assign({}, val)
      this.keyword.pageNo = 1
      this.getLogs(this.keyword)
    },
    // 删除所选列表
    deleteLogs (val) {
      this.loading = true
      const autoClose = setTimeout(() => {
        this.loading = false
        this.$message.info(`
        由于网络连接情况不佳或是需要变更的数据量过大，为不影响其他行为，当前操作已转到后台执行，完成时会以通知的形式提示！
        `)
      }, 20000)
      this.delLogs(val).then((res) => {
        this.loading = false
        clearTimeout(autoClose)
        if (res.code === '0') {
          this.getLogs(val)
          this.$message.success('删除成功！')
        } else {
          this.$message.error('删除失败！')
        }
      }).catch(err => {})
    }
  }
}
</script>
