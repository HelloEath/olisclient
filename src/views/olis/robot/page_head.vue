<template>
    <el-card class="page-head" style="position: relative;">
      <search-bar @reset="reset" @search="searchFilter" @toggle="changeToggleSearch">
        <el-form
          slot="searchForm"
          :model="keyword" 
          class="search-form"
          :class="showMore?'showMore':''"
          label-width="80px"
          label-position="right" 
          size="small">
          <el-col :span="8">
            <el-form-item label="登录账号">
              <el-input
                clearable
                placeholder="请输入登录账号"
                v-model="keyword.username">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="用户名">
              <el-input
                clearable
                placeholder="请输入用户名"
                v-model="keyword.name">
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="角色">
              <el-select 
                clearable 
                v-model="keyword.roleId"
                placeholder="请选择用户角色">
                  <el-option 
                    v-for="(item, index) in roles" 
                    :key="index" 
                    :label="item.name" 
                    :value="item.id">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="账号状态">
              <el-select
                clearable
                v-model="keyword.status"
                placeholder="请选择账号状态">
                  <el-option
                    v-for="(enu, index) in enumerate.status"
                    :key="index"
                    :label="enu.name"
                    :value="enu.value">
                  </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </search-bar>
    </el-card>
</template>

<script>
import searchBar from '@/components/searchBar'
import departmentSelect from '@/components/department_select'
import { mapGetters, mapActions } from 'vuex'
import * as enumerate from '@/setting/enumerate/enumerate'
  export default {
    name: 'page-head',
    components: {
        searchBar,
        departmentSelect
    },
    data () {
      return {
          enumerate,
          keyType: '1',
          query: '',
          timeRange: [],
          keyword: {},
          showMore: false,
      }
    },

    computed: {
      ...mapGetters(['roles']),
    },
    methods: {
      searchFilter() {
        this.$emit('search', this.keyword);
      },

      changeToggleSearch(val) {
        this.showMore = val;
      },

      reset() {
        this.keyword = {};
        this.timeRange = []
        this.query = '';
      }
    }
  }
</script>
