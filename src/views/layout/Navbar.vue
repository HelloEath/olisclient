<template>
  <div class="app-head">
    <div 
			class="siderbar-button hidden-sm-and-down" 
			:class="hideSidebar === true?'siderbar-button-hide': 'siderbar-button-show'">
      <svg class="icon siderbar-icon" style="right: -40px;" aria-hidden="true" @click="toggleSideBar">
        <use xlink:href="#icon-menu"></use>
      </svg>
    </div>
		<breadcrumb class="breadcrumb-container" />
    <div class="header-item">
      <el-button type="text" class="beforeIcon">
        <svg class="icon user-icon" aria-hidden="true">
           <use xlink:href="#icon-user"></use>
        </svg>
        {{user.name}} {{user.department?(" -"+user.department.name):""}}{{user.role?("("+user.role.name+")"):""}}
      </el-button>
    </div>
    <div class="header-item">
      <el-button type="text" class="beforeIcon" @click="logout">
        <svg class="icon logout-icon" aria-hidden="true">
           <use xlink:href="#icon-exit"></use>
        </svg>
        退出
      </el-button>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters, mapActions} from 'vuex'
  import axios from 'axios'
  import {removeStore} from './../../common/utils.js'
  import { server } from './../../common/ajax.js'
	import breadcrumb from './Breadcrumb.vue'
  export default {
    name: 'pageHeader',
		components: { breadcrumb },
    data () {
      return {
        isFull: false,
        name: '王小二',
        head: require('../../assets/images/logo.png'),
        collapse: false,
      }
    },
    computed: {
      ...mapState({
        user: state => state.global.user
      }),
      ...mapGetters([
        "hideSidebar"
      ]),
    },
    mounted () {
    },
    methods: {
      ...mapActions(['toggleAppMain']),
      toggleSideBar() {
        let hideSidebar = !this.hideSidebar;
        this.toggleAppMain(hideSidebar);
      },
      logout () {
        let _this = this;
        this.$confirm('注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/logout', {
            query: ''
          }).then((res) => {
            console.log("login out msg = "+res);
            _this.$store.commit('logout');
            window.sessionStorage.clear();
            window.location= localStorage.getItem("loginUrl");
          }).catch((error) => {
            console.log(error)
          })
        })
      }
    }
  }
</script>
