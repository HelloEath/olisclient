<template>
  <div class="page-wrap">
    <page-head @search="searchFilter">
    </page-head>

    <div class="page-main">
      <el-card class="table-card">
        <lb-table
          :column="tableData.column"
          :data="packageExceptionList.content"
          :total="Number(packageExceptionList.totalElements)"
          pagination
          background
          border
          :currentPage="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          @p-current-change="pCurrentChange"
        >
        </lb-table>
      </el-card>
    </div>

  </div>
</template>

<script>
import LbTable from "@/components/lb-table/lb-table";
import pageHead from "./page_head.vue";
import { mapState, mapGetters, mapActions } from "vuex";
import { getStore } from "@/common/utils.js";

export default {
  name: "package-exception-list",

  components: {
    pageHead,
    LbTable,
  },

  data() {
    return {
      keyword: {
        pageNo: 1
      },
      currentPage: 1,
      tableData: {
        column: [
          {
            prop: "name",
            label: "名称"
          },
          {
            prop: "day",
            label: "创建时间"
          },
          {
            prop: "detail",
            label: "详情"
          }
        ]
      }
    }
  },

  created() {
    this.getPackageExceptionList(this.keyword);
  },

  computed: {
    ...mapGetters([
      "packageExceptionList",
    ])
  },
  methods: {
    ...mapActions([
      "getPackageExceptionList",
      // "getPackageDetail",
      // "deletePackageId",
      // "resumePackage"
    ]),

    refreshTextData(type) {
      if (type === "add") {
        this.keyword = { pageNo: 1 };
        this.currentPage = 1;
      };
      this.getPackageExceptionList(this.keyword);
    },

    //分页当前页码值改变时请求对应列表数据
    pCurrentChange(val) {
      this.currentPage = val;
      this.keyword.pageNo = val;
      this.getPackageExceptionList(this.keyword);
    },

    //列表过滤
    searchFilter(val) {
      this.currentPage = 1;
      this.keyword = Object.assign({}, val)
      this.keyword.pageNo = 1;
      this.getPackageExceptionList(this.keyword);
    }
  },
}
</script>
