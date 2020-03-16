<template>
    <div>
      <template v-for="list in this.menuList">
        <el-submenu v-if="list.children&&list.children.length>0" :key="list.id" :index="String(list.id)"> 
          <template slot="title" style="padding-left:10px">
            <i class="nav" :class="list.iconCls"></i>
            <span slot="title">{{ list.name }}</span>
          </template>
          <Menu :menuList="list.children"></Menu>
        </el-submenu>
        <div v-else>
          <el-menu-item index="" :key="list.id" v-if="list.path && (list.path).indexOf('http')>-1" @click="toNewLink(list.path)">
            <i class="nav" :class="list.iconCls||'nav_sub'"></i>
            <span>{{list.name}}</span>
          </el-menu-item>
          <el-menu-item v-else :index="list.path||''" :key="list.id" @click="clearStore">
            <i class="nav" :class="list.iconCls||'nav_sub'"></i>
            <span>{{list.name}}</span>
            <router-link :to="list.path" class="rLink"></router-link>
          </el-menu-item>
        </div>
      </template>
    </div>
</template>
<style>
  .el-menu--collapse  span,
  .el-menu--collapse  i.el-submenu__icon-arrow
  {
    height: 0;
    width: 0;
    overflow: hidden;
    visibility: hidden;
    display: inline-block;
  }
</style>
<script>
    import { getStore, removeStore } from '@/common/utils'
    export default{
        name:'Menu',//模板名称
        data(){
            return {
              open: false,
            }
        },
        beforeMount(){
        },
        props:['menuList'],
        methods: {
          toNewLink(url) {
            const user = JSON.parse(getStore("currentUser"));
            //console.log(user);
            const path = url + "&branchCode=" + user.department.vCode;
            window.open(path);
          },
          clearStore(){
            removeStore('outParams');
            removeStore('SetParams');
            removeStore('activityActiveTab');
            removeStore('backlogTab');
            removeStore('overviewTab');
          }
        }
    }
</script>