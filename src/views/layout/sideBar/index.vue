<template>
  <div id="home-menu">
    <router-link to="home"><div class="menu_logo"><div style="color: white;font-size: 20px;width: 70%;align-self: center;margin-left: 5px">{{olisShowName}}后台管理系统</div></div></router-link>
      <el-scrollbar class="menu_scrollbar no-x-scroll">
        <div class="menu_list">
          <el-menu
             class="el-menu-vertical-demo"
             :collapse="isCollapse"
             :router="routerModel"
             background-color="transparent"
             text-color="rgba(255,255,255,0.7)"
             unique-opened
             :default-active="$route.path">
            <Menu :menuList="userType !== 1 ? menus : digitalMenus"></Menu>
          </el-menu>
        </div>
      </el-scrollbar>
    </div>
</template>
<script>
import Menu from './menu.vue'; //引进菜单模板
import {mapGetters} from 'vuex'
import { getStore, setStore, removeStore } from './../../../common/utils'
export default{
    data(){
      return {
        isCollapse: false,//菜单展开功能
        routerModel: true,
        unCollapse:{
          width:'220px'
        },
        olisShowName:'',
        collapse:{
          width:'50px'
        },
        unCollapseMain:{
          paddingLeft:'220px'
        },
        collapseMain:{
          paddingLeft:'50px'
        }
      }
  },
  computed: {
    ...mapGetters(["menus", "loginUser"]),
    
    userType() { //判断当前用户角色类型
      return this.loginUser.userType || null
    },
    digitalMenus() {//数字化营销用户菜单
      let digitalMenus
      //判断空值
      if (this.menus.length) {//只显示首页栏和活动管理栏
        digitalMenus = this.menus.slice(0,2)
        digitalMenus[1].children = digitalMenus[1].children.slice(0,2)
      } else {
        digitalMenus = null
      }
      return digitalMenus
    },
  },
  created(){
    let olisFlag=JSON.parse(localStorage.getItem('olisFlag'));
    if (olisFlag){
      this.olisShowName=olisFlag.olisShowName;
    } else{
      //_this.$router.replace({path:''});

    }
  },
  methods:{
    toggleClick(){//菜单展开功能
      this.isCollapse=!this.isCollapse;
    }
  },
  components:{
    Menu//使用菜单组件
  }
}
</script>
<style lang="scss">
  @import '~@/assets/css/common';
  @import '~@/assets/css/sprite';
  @mixin sprite{
    background:url(~@/assets/images/sprite.png) no-repeat;
  }
  #home-menu {
    .menu_logo {
      display: flex;
      width:100%;
      height:70px;
     // background: url(~@/assets/images/menu_logo.png) no-repeat center center;
      background-size: 100% 100%;
    }
    .menu_scrollbar {height: calc(100% - 70px);}
    .menu_list {
      height: 100%;
      padding-bottom: 80px;
      .el-menu{
        border:none;
        background: transparent;
      }
      .el-menu-item, .el-submenu__title {
        height:56px;
        line-height:56px;
        color:#fff !important;
        background: transparent;
        .rLink {
          width:100%;
          height:100%;
          display: block;
          position: absolute;
          top:0;
          left:0;
        }
        .nav_tit {
          color:#fff;
          font-size:$font-nav;
        }
        .nav {
          width:20px;
          height:20px;
          display:inline-block;
          @include sprite;
          margin-right:10px;
          color:#fff;
          &.nav_01 {@include nav01;}
          &.nav_02 {@include nav02;}
          &.nav_03 {@include nav03;}
          &.nav_04 {@include nav04;}
          &.nav_05 {@include nav05;}
          &.nav_06 {@include nav06;}
          &.nav_07 {@include nav07;}
          &.nav_08 {@include nav08;}
          &.nav_09 {@include nav09;}
          &.nav_sub {@include nav_sub;}
        }
        &.is-active {
            background:#1AA194 !important;
            .nav_tit {
              color:#fff !important;
            }
            i {
              &.nav_01 {@include s_nav01;}
              &.nav_02 {@include s_nav02;}
              &.nav_03 {@include s_nav03;}
              &.nav_04 {@include s_nav04;}
              &.nav_05 {@include s_nav05;}
              &.nav_06 {@include s_nav06;}
              &.nav_07 {@include s_nav07;}
              &.nav_08 {@include s_nav08;}
              &.nav_09 {@include s_nav09;}
              &.nav_sub {@include s_nav_sub;}
            }
        }
        &:hover {
          background:#1AA194 !important;
        }
      }
      .el-submenu {
        background: none;
        &.is-active {
            .el-submenu__title {
              color:#fff !important;
              i {
                &.nav_01 {@include s_nav01;}
                &.nav_02 {@include s_nav02;}
                &.nav_03 {@include s_nav03;}
                &.nav_04 {@include s_nav04;}
                &.nav_05 {@include s_nav05;}
                &.nav_06 {@include s_nav06;}
                &.nav_07 {@include s_nav07;}
                &.nav_08 {@include s_nav08;}
                &.nav_09 {@include s_nav09;}
                &.nav_sub {@include s_nav_sub;}
              }
          }
        }
        &__title:hover {
          background:#1AA194 !important;
        }
      }
    }
    .home-menu-header {
      height: $home-head-height;
      line-height: $home-head-height;
      color: #fff;
      text-align: center;
    }
  }
</style>
