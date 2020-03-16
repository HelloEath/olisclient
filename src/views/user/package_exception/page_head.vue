<template>
  <el-card
    class="page-head"
    style="position: relative;"
  >
    <search-bar
      @reset="reset"
      @search="searchFilter"
      @toggle="changeToggleSearch"
    >
      <el-form
        slot="searchForm"
        :model="keyword"
        class="search-form"
        :class="showMore?'showMore':''"
        label-width="80px"
        label-position="right"
        size="small"
      >
        <el-col :span="8">
          <el-form-item label="名称">
            <el-input
              clearable
              placeholder="请输入名称"
              v-model="keyword.name"
            >
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item  label="日期" class="search-box-input" prop="timeRange">
            <el-date-picker
              v-model="keyword.day"
              clearable
              value-format="timestamp"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              type="datetimerange">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-form>
    </search-bar>
  </el-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import searchBar from "@/components/searchBar";
import LbTable from "@/components/lb-table/lb-table";

export default {
  name: "page-head",

  inject: [],

  components: {
    searchBar
  },

  data() {
    return {
      keyword: {
        name: "",
        day: null,
      },
      showMore: false,
    }
  },

  computed: {
    startDay(){
      return this.keyword.day ? this.keyword.day.length&&this.keyword.day[0] : ""
    },
    endDay(){
      return this.keyword.day ? this.keyword.day.length&&this.keyword.day[1] : ""
    },
  },

  watch: {
    startDay(val){
      this.keyword.startDay = val
    },
    endDay(val){
      this.keyword.endDay = val
    },
    // "systemParamsTab.activeName": function () {
    //   this.reset();
    //   this.searchFilter();
    // }
  },

  methods: {
    searchFilter() {
      this.$emit("search", this.keyword);
    },

    changeToggleSearch(val) {
      this.showMore = val;
    },

    reset() {
      Object.keys(this.keyword).map(key => {
        this.keyword[key] = "";
      })
    }
  }
}
</script>
