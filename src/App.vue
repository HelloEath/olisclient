<template>
  <div id="app">
    <div class="preStep" @click="preStep" v-show="this.$store.state.isShowStep"> <i class="el-icon-caret-left"></i></div>
    <router-view></router-view>
  </div>
</template>

<script>
  import Vue from 'vue'     //注意，要在这个页面中引入vue，不然下面的Vue.prototype会报错

  export default {
    data() {

    },
    methods: {
      preStep() {
        this.$router.back(-1)
      }
    }
  }
</script>

<style>
  @import './assets/iconfont/iconfont.css';

  html {
    height: 100%;
    box-sizing: border-box;
  }

  body {
    height: 100%;
    background: #F5F6F7;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: NotoSansHans-Regular, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  @font-face {
    font-family: NotoSansHans-Regular;
    src: url("../static/font/NotoSansHans-Regular.otf");
  }

  .preStep {
    position: fixed;
    background-color: #FFF;
    width: 40px;
    height: 40px;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    font-size: 20px;
    -webkit-box-shadow: 0 0 6px rgba(0,0,0,.12);
     box-shadow: 0 0 6px rgba(0,0,0,.12);
    cursor: pointer;
    z-index: 5;
    border-radius: 50%;
    position: fixed;
    right: 40px;
    top: 206px;
    //background-image: url(./assets/mobile/images/retun-back.png);
    //background-repeat: no-repeat;
   // background-position: center center;
    //background-size: 100% 100%;
    color: #1AA194;
  }

  #app {
    min-width: 1024px;
    height: 100%;
  }
</style>
