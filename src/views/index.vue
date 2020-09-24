<template>
  <div :class="{hideSidebar:hideSidebar}" class="app-wrapper">
      <side-bar class="sidebar-container"></side-bar>
      <div class="main-container">
        <Navbar></Navbar>
        <app-main></app-main>
      </div>
      <back-to-top></back-to-top>
  </div>
</template>
<script>
  import sideBar from './layout/sideBar/index'
  import Navbar from "./layout/Navbar"
  import AppMain from "./layout/AppMain"
  import backToTop from "@/components/backToTop"
  import ResizeMixin from '@/mixins/ResizeHandler'
  import init from '@/mixins/init'
  import { mapGetters, mapActions } from 'vuex'

  export default {
      name: 'index',
      mixins: [ResizeMixin, init],
      components: {
          sideBar,
          Navbar,
          AppMain,
          backToTop
      },
      computed: {
        ...mapGetters(["hideSidebar"]),
      }
}
</script>
<style lang="scss" >
  @import '../assets/css/common';
  @import '../assets/css/tooltip';

  .app-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    &.hideSidebar {
      .sidebar-container {
        width: 0 !important;
        -webkit-transition: width 0.35s;
        transition: width 0.35s;
      }
      .main-container {
        margin-left: 0px !important;
        transition: margin-left .35s;
        -webkit-transition: margin-left .35s;
        .app-head {
          width: 100% !important;
          -webkit-transition: width 0.35s;
          transition: width 0.35s;
         }
      }
    }
    .sidebar-container {
      -webkit-transition: width 0.35s;
      transition: width 0.35s;
      width: 240px !important;
      height: 100%;
      position: fixed;
      font-size: 0px;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 1001;
      overflow: hidden;
      background-color: #393D49;
     /* background: url(~@/assets/images/menu_bg.png) no-repeat center bottom,-webkit-linear-gradient(#5398ff, #5bafff, #5bd0fe);
      background: url(~@/assets/images/menu_bg.png) no-repeat center bottom,-o-linear-gradient(#5398ff, #5bafff, #5bd0fe);
      background: url(~@/assets/images/menu_bg.png) no-repeat center bottom,-moz-linear-gradient(#5398ff, #5bafff, #5bd0fe);
      background: url(~@/assets/images/menu_bg.png) no-repeat center bottom,linear-gradient(#5398ff, #5bafff, #5bd0fe);
      background: url(~@/assets/images/menu_bg.png) no-repeat center bottom,linear-gradient(#5398ff, #5bafff, #5bd0fe);*/
    }
    .main-container {
      min-height: 100%;
      transition: margin-left .35s;
      -webkit-transition: margin-left .35s;
      margin-left: 240px !important;
      position: relative;
      .app-head {
        position: fixed;
        -webkit-transition: width 0.35s;
        transition: width 0.35s;
        width: calc(100% - 240px);
        height: $home-head-height;
        background-color: $home-head-bg;
        padding-right:20px;
        border-bottom:2px solid #e7ebf4;
        text-align: right;
        z-index: 2000;
        .siderbar-button {
          position: absolute;
          width: 20px;
          height: 20px;
          top: 50%;
          margin-top: -10px;
          left: 10px;
          z-index: 105;
          cursor:pointer;
          .siderbar-icon {
            width: 28px;
            height: 29px;
            fill: #777;
            margin-top: -4px;
          }
          &.siderbar-button-show {
            transition: all ease .5s;
            .siderbar-icon {
              transition: all ease .5s;
            }
          }
          &.siderbar-button-hide {
            transition: all ease .5s;
            .siderbar-icon {
              transform:rotate(180deg);
              transition: all ease .5s;
            }
          }
        }
        .header-item {
          display: inline-block;
          height:$home-head-height;
          line-height:$home-head-height;
          .beforeIcon {
            padding-left:25px;
            position:relative;
            color:#333;
            .user-icon {
              width: 16px;
              height: 16px;
              fill: #1AA194;
              vertical-align: -2px;
              margin-right: 4px;
            }
            .logout-icon {
              width: 18px;
              height: 18px;
              fill: #FF4949;
              vertical-align: -4px;
              margin-right: 3px;
            }
          }
          .el-button, span {
            color: #666;
          }
        }
      }
      .app-main {
        width: 100%;
        min-height: calc(100vh - 60px);
        position: relative;
        padding: 70px 10px 10px 10px;
				.page-wrap {
				    overflow: hidden;
				}
        .page-breadcrumb {
          line-height: 32px;
          .el-breadcrumb__separator {
            margin: 0 9px;
            font-weight: 700;
            color: #c0c4cc;
          }
          .el-breadcrumb__inner {
            a {
              color: #5e6d82;
              font-weight: normal;
              transition: all 0.5s;
              &:hover {
                color: #57a0f2;
              }
            }
          }
        }
      }
      .page {
        background: #fff;
        border-radius: 5px;
        padding: 24px;
        .page-head {
          .search-key-section {
            display: inline;
            margin-right: 16px;
            .el-input {
              width: 160px;
            }
            .add-btn {
              float: right;
            }
          }
        }
        .table-wrap {
          margin-top: 24px;
          th {
            background: rgba(250, 250, 250, 1);
          }
          .table-ope-btns {
            margin-bottom: 12px;
          }
          .el-pagination {
            text-align: center;
            margin-top: 32px;
          }
        }
      }
    }
  }

  ::-webkit-scrollbar {
    width: 10px;
    height: 5px;
  }

  ::-webkit-scrollbar-track-piece {
      background-color: rgba(0, 0, 0, 0.2);
      -webkit-border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:vertical {
      height: 5px;
      background-color: rgba(125, 125, 125, 0.7);
      -webkit-border-radius: 6px;
  }

  ::-webkit-scrollbar-thumb:horizontal {
      width: 5px;
      background-color: rgba(125, 125, 125, 0.7);
      -webkit-border-radius: 6px;
  }
</style>
