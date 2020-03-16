<template>
    <div class="activity-audit" id="activity-audit">
        <loading :showLoading="rt_toDoLoading"></loading>
      <audit-header v-on:searchFilter="filterSch" ref="child" :isShowApproveStatus="isShowApproveStatus"></audit-header>
        <div v-loading="rt_toDoLoading">
          <el-row v-if="rt_toDoList && rt_toDoList.content && rt_toDoList.content.length > 0">
            <audit-table :tableData="rt_toDoList.content" :pageType="1" :pageData="pageData"></audit-table>
              <div class="flex_page">
                <el-pagination
                background
                :current-page="currentPage"
                :page-size="rt_toDoList.size"
                :page-count="rt_toDoList.totalPage"
                :pager-count="rt_toDoList.totalPage"
                layout=" total, prev, pager, next"
                :total="rt_toDoList.totalElements"
                 @current-change="handleCurrentChange">
                </el-pagination>
              </div>
          </el-row>
          <el-row v-else class="noData">暂无数据</el-row>
        </div>
    </div>
</template>
<script>
/**
 * 此为活动审批主入口
 * activity_module_header.vue 活动审批头部表单组件
 * audit_table.vue 活动审批表格组件
 **/
import {mapGetters, mapActions} from 'vuex'
import auditTable from './../activity_audit/realtime_audit_table.vue'
import { getStore } from './../../common/utils.js'
import auditHeader from './../activity_audit/realtime_audit_header_home.vue'

export default {
    name: 'activityAudit',
    props:['currentPage'],
    data () {
        return {
            pageData: {
                cols: [  //表格表头参数
                    { label: "活动名称", prop: "approval.messtemp.stormRules.ruleName",type: "name"},
                    { label: "活动渠道", prop: "approval.messtemp.messageType",type: "channel"},
                    { label: "活动发起方", prop: "approval.messtemp.stormRules.department.name",type: "department"},
                    { label: "活动类型", prop: "approval.messtemp.stormRules.activityType",type: "activityType" },
                    {label: "产品类型", prop: "approval.messtemp.stormRules.productType",type: "productType"},
                    { label: "开始日期", prop: "approval.messtemp.stormRules.triggerConditionDuration",type: "startDate"},
                    { label: "结束日期", prop: "approval.messtemp.stormRules.triggerConditionFailuretime",type: "endDate"},
                    { label: "发起日期", prop: "createTime",type: "createTime"},
                    { label: "审批状态", prop: "status",type: "status"},
                    { label: "操作",type: "operation"},
                ]
            },
            params:{
                // departmentId:'',
                pageNo:1
            },
          isShowApproveStatus: false//是否显示审批状态筛选项
        }
    },
    computed: {
        ...mapGetters(['rt_toDoLoading','rt_toDoList']),
    },
  mounted () {
    window.addEventListener('beforeunload',this.beforeUnloadHandler, true);
  },
  created() {

  },
    methods: {
        ...mapActions(['getRtToDo']),
        //分页当前页码
        handleCurrentChange(val) {
            this.params.pageNo = val;
            this.$emit('changePage',val);
            this.getRtToDo(this.params);
        },
      beforeUnloadHandler(){
        removeStore('outTodoparamsHome');
      },
      //搜索数据
      filterSch (data) {
        this.params =data;
        this.handleCurrentChange(this.params.pageNo)
      },

      reset() {
        this.$refs.child.reSet();
      }
    },
    components: {
        auditTable,
        auditHeader
    }
}
</script>

<style lang="scss" scoped>
#home-container .page-container #activity-audit {
    padding: 0;
}
.el-pagination{
    text-align:center;
}
.el-loading-spinner {
    .el-icon-loading {
        font-size: 50px;
    }
    .el-loading-text {
        font-size: 20px;
    }
}
</style>
