<template>
  <div class="uil-loading" v-show="showLoading">
    <div class='uil-default-icon'></div>
  </div>
</template>

<script>
    export default {
        props: {
          showLoading: {
            type: Boolean
          }
        }
    }
</script>

<style lang="scss">
    @import './../../assets/css/common';
    .hideSidebar {
      .uil-loading {
        width: 100% !important;
        left: 0 !important;
      }
    }
    .uil-loading {
      width: calc(100% - 240px);
      height: calc(100% - 60px);
      position: fixed;
      top: 60px;
      left: 240px;
      background: #fff;
      z-index:2001;
      display:flex;
      justify-content: center;
      align-items: center;
      .uil-default-icon {
        width:200px;
        height:200px;
        display: block;
        background: url(./../../assets/images/loading.gif) no-repeat center center;
        background-size: 200px 200px;
        z-index:2002;
      }
    }
</style>
