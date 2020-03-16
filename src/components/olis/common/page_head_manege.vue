<template>
  <el-card class="page-head" style="position: relative;">
      <el-form
        :model="keyword"
        class="search-form"
        label-width="80px"
        label-position="right"
        size="small">
        <el-col :span="2">
          <el-button
            size="small"
            class="button-item"
            type="primary"
            @click="$emit('add')">
            添加<i class="el-icon-plus el-icon--right"></i>
          </el-button>
        </el-col>

        <el-col :span="6">
          <el-form-item label="搜索条件：">
            <el-input
              clearable
              :placeholder="tips"
              v-model="keyword.keyWorlds">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="padding-left: 20px">
          <el-button
            type="primary"
            size="small"
            class="button-item"
            @click="$emit('searchFilter',keyword)">
            查询<i class="el-icon-search el-icon--right"></i>
          </el-button>

          <el-button
            size="small"
            class="button-item"
            type="primary"
            @click="resetParams">
            重置<i class="el-icon-refresh el-icon--right"></i>
          </el-button>
        </el-col>


      </el-form>

  </el-card>
</template>

<script>

  export default {
    name: 'page-head',
    props:['tips'],

    data () {
      return {
        keyword: {},
      }
    },
    methods:{
      resetParams(){
        this.keyword={};
        this.$emit('searchFilter',this.keyword)
      }
    }
  }
</script>
