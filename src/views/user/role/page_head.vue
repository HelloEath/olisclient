<template>
    <el-card class="page-head">
        <search-bar :searchType="'noSearch'">
          <!-- 按钮插槽-功能按钮 -->
          <el-button
              slot="funBtn"
              size="small" 
              class="button-item" 
              type="primary"
              disabled
              @click="$emit('add')">
              新增角色<i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </search-bar>
    </el-card>
</template>
<script>
import searchBar from '@/components/searchBar'
  export default {
    name: 'role-head',
    components: {
        searchBar
    },
    data () {
      return {
      }
    },
    methods: {
    }
  }
</script>
