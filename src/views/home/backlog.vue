<template>
  <div>
    <el-tabs
      v-model="activeTab"
      @tab-click="handleClick"
    >
      <el-tab-pane
        label="待办事项"
        name="first"
      >
        <backlog-first
          ref="backlogFirst"
          :currentPage="currentPage"
          @changePage="changeCurrentPage"
        >
          <backlog-head
            @search-data="backlogSearchData"
          >
          </backlog-head>
        </backlog-first>
      </el-tab-pane>
      <el-tab-pane
        label="已办事项"
        name="second"
      >
        <backlog-second
          ref="backlogSecond"
          :currentPage="currentPage"
          @changePage="changeCurrentPage"
        >
          <backlog-head
            @search-data="backlogSearchData"
            @reset-search-data="resetBacklogSearchData"
          ></backlog-head>
        </backlog-second>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import backlogHead from './backlog_head';
import backlogFirst from './backlog_first.vue'
import backlogSecond from './backlog_second.vue'
import { getStore, setStore, removeStore } from './../../common/utils.js'
import { mapActions } from 'vuex'
export default {
  name: 'activityIndexEntry',

  components: {
    backlogHead,
    backlogFirst,
    backlogSecond
  },

  provide() {
    return {
      'backlog': this
    }
  },

  data() {
    return {
      activeTab: 'first',
      params: { pageNo: 1 },
      currentPage: 1
    }
  },
  created() {
    this.initPage();
  },
  methods: {
    ...mapActions(['getToDo', 'getDone']),
    initPage() {
      let outParams = getStore("outParams") ? JSON.parse(getStore("outParams")) : '';
      let tabPaneName = getStore("backlogTab") || 'first';
      this.activeTab = tabPaneName || 'first';
      if (outParams) {
        this.params = Object.assign(this.params, outParams);
        this.changeCurrentPage(outParams.pageNo);
      }
      if (tabPaneName) {
        if (tabPaneName === 'first') {
          this.getToDo(this.params);
        } else if (tabPaneName === 'second') {
          this.getDone(this.params);
        }
      } else {
        this.getToDo({ pageNo: 1 });
      }
    },

    changeCurrentPage(data) {
      this.params.pageNo = data;
      if (this.activeTab == 'first') {
        this.getToDo(this.params);
        this.currentPage = data;
      } else {
        this.getDone(this.params);
        this.currentPage = data;
      }
    },

    backlogSearchData(data) {
      this.params = Object.assign({}, data);
      this.params.pageNo = 1;
      //console.log(this.params);
      if (this.activeTab == 'first') {
        this.getToDo(this.params);
        this.currentPage = 1;
      } else {
        this.getDone(this.params);
        this.currentPage = 1;
      }
    },

    resetBacklogSearchData(data) {
      
    },

    handleClick() {
      setStore('backlogTab', this.activeTab);
      if (this.activeTab == 'first') {
        this.getToDo({ pageNo: 1 });
        this.currentPage = 1;
      } else {
        this.getDone({ pageNo: 1 });
        this.currentPage = 1;
      }
    }
  }
}
</script>
