<template>
  <div>
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane label="待办事项" name="first">
        <backlog-first ref="backlogFirst" :currentPage="currentPage" @changePage="changeCurrentPage"></backlog-first>
      </el-tab-pane>
      <el-tab-pane label="已办事项" name="second">
        <backlog-second ref="backlogSecond" :currentPage="currentPage" @changePage="changeCurrentPage"></backlog-second>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import backlogFirst from './rt_backlog_first.vue'
  import backlogSecond from './rt_backlog_second.vue'
  import { getStore, setStore, removeStore } from './../../common/utils.js'
  import { mapActions } from 'vuex'
  export default{
    name:'rtActivityIndexEntry',
    components: {
      backlogFirst,
      backlogSecond
    },
    data () {
      return{
        activeTab: 'first',
        params:{pageNo:1},
        currentPage:1
      }
    },
    created () {
      this.initPage();
    },
    methods:{
      ...mapActions(['getRtToDo','getRtDone']),
      initPage() {
        let outParams = getStore("outTodoparams") ? JSON.parse(getStore("outTodoparams")) : '';
        let tabPaneName = getStore("backlogTab") || 'first';
        this.activeTab = tabPaneName || 'first';
        /*if(outParams){
            this.params = Object.assign(this.params,outParams);
            this.changeCurrentPage(outParams.pageNo);
        }
        if(tabPaneName){
            if(tabPaneName === 'first'){
                this.getRtToDo(this.params);
            }else if(tabPaneName === 'second'){
                this.getRtDone(this.params);
            }
        }else{
          this.getRtToDo({pageNo:1});
        }*/
      },
      changeCurrentPage(data) {
        this.currentPage = data;
      },
      handleClick() {
        setStore('backlogTab',this.activeTab);
        if (this.activeTab == 'first') {
          this.$refs.backlogFirst.reset();//切换tab清除帅选项参数
          this.getRtToDo({pageNo:1});
          this.currentPage = 1;
        } else {
          this.$refs.backlogSecond.reset();
          this.getRtDone({pageNo:1});
          this.currentPage = 1;
        }
      }
    }
  }
</script>
