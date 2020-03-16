<template>
  <div class="app-main">
<!--
    <Loading :showLoading="GlobalLoading"></Loading>
-->
    <transition name="fade-transform" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'AppMain',
    data () {
      return {

      }
    },
    computed: {
        ...mapGetters(['GlobalLoading']),
    },
  }
</script>
