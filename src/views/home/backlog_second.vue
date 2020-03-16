<template>
  <div
    class="activity-audit"
    id="activity-audit"
  >
    <slot></slot>
    
    <el-row v-if="doneList && doneList.content && doneList.content.length > 0">
      <audit-table
        :tableData="doneList.content"
        :pageType="1"
        :pageData="pageData"
      >
      </audit-table>
      <pagination
        :hidden="!doneList.totalElements"
        :total="Number(doneList.totalElements)"
        :currentpage="currentPage"
        @pagination="handleCurrentChange"
      >
      </pagination>
    </el-row>
    <el-row
      v-else
      class="noData"
    >暂无数据</el-row>
  </div>
</template>

<script>
/**
 * 此为活动审批主入口
 * activity_module_header.vue 活动审批头部表单组件
 * audit_table.vue 活动审批表格组件
 **/
import { mapGetters, mapActions } from 'vuex'
import auditTable from '@/views/activity_audit/audit_table.vue'
import { getStore } from '@/common/utils.js'
import pagination from '@/components/Pagination'
export default {
  name: 'activityAudit',
  components: {
    auditTable,
    pagination
  },
  inject: ['backlog'],
  props: ['currentPage'],
  data() {
    return {
      pageData: {
        cols: [  //表格表头参数
          { label: "活动名称", prop: "approval.channel.activity.name", type: "name" },
          { label: "活动渠道", prop: "approval.channel.showName", type: "channel" },
          { label: "活动发起方", prop: "approval.channel.activity.department.name", type: "department" },
          { label: "活动类型", prop: "approval.channel.activity.activityType", type: "activityType" },
          { label: "产品类型", prop: "approval.channel.activity.productType", type: "productType" },
          { label: "开始日期", prop: "approval.channel.startDate", type: "startDate" },
          { label: "结束日期", prop: "approval.channel.endDate", type: "endDate" },
          { label: "发起日期", prop: "createTime", type: "createTime" },
          { label: "审批状态", prop: "status", type: "status" },
          { label: "操作", type: "operation" },
        ]
      },
      params: {
        // departmentId:'',
        pageNo: 1
      },
    }
  },
  computed: {
    ...mapGetters(['doneList']),
  },
  methods: {
    //分页当前页码
    handleCurrentChange(val) {
      this.$emit('changePage', val);
    }
  }
}
</script>

<style lang="scss" scoped>
#home-container .page-container #activity-audit {
  padding: 0;
}
.el-pagination {
  text-align: center;
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
