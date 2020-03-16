<template>
  <el-card class="page-head">
    <search-bar @reset="reset" @search="searchFilter" @toggle="changeToggleSearch" @del="del" :needDel="true">
      <el-form
        slot="searchForm"
        :model="keyword" 
        ref="pageHeadForm"
        :rules="rules"
        class="search-form"
        :class="showMore?'showMore':''"
        label-width="100px"
        label-position="right" 
        size="small">

        <el-col :span="8">
          <el-form-item label="用户名" prop="user">
            <el-input
              clearable
              placeholder="请输入用户名"
              v-model="keyword.user">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="接口名" prop="url">
            <el-input
              clearable
              placeholder="请输入接口名"
              v-model="keyword.url">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="日志信息" prop="levelString">
            <el-select v-model="keyword.levelString" clearable placeholder="请选择日志信息">
                <el-option
                  :label="item.name"
                  :value="item.value"
                  v-for='(item, i) in enumerate.levelString'
                  :key='i'>
                </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        
        <el-col :span="8">
          <el-form-item  label="操作时间" class="search-box-input" prop="timeRange">
            <el-date-picker
              v-model="keyword.timeRange"
              clearable
              value-format="timestamp"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              type="datetimerange">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-form>
    </search-bar>
  </el-card>
</template>
<script>
import searchBar from '@/components/searchBar'
import * as enumerate from '@/setting/enumerate/enumerate'
export default {
  name: 'userIndex',
  components: {
    searchBar
  },
  data () {
    const validateIsPass = (rule, value = '', callback) => { // 验证是否至少输入一项查询字段
      if (typeof value === 'string') {
        value = value.trim()
      }
      if (this.isPass === true) {
        return callback()
      }
      if (value !== '') {
        this.isPass = true
      }
      callback()
    }
    return {
      enumerate,
      showMore: false,
      isPass: false,
      keyword: {
        startDate: '',
        endDate: '',
        user: '',
        url: '',
        levelString: '',
        timeRange: ''
      },
      rules: {
        user: [
          {validator: validateIsPass, trigger: 'blur'}
        ],
        url: [
          {validator: validateIsPass, trigger: 'blur'}
        ],
        levelString: [
          {validator: validateIsPass, trigger: 'blur'}
        ],
        timeRange: [
          {validator: validateIsPass, trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    searchFilter () {
      // 重置上一次时间选择
      this.keyword.startDate = ''
      this.keyword.endDate = ''
      if (this.keyword.timeRange && this.keyword.timeRange.length) {
        this.keyword.startDate = this.keyword.timeRange[0]
        this.keyword.endDate = this.keyword.timeRange[1]
      }
      this.$emit('search', this.keyword)
    },
    changeToggleSearch (val) {
      this.showMore = val
    },
    reset () {
      this.keyword = {}
    },
    del () {
      this.keyword.startDate = ''
      this.keyword.endDate = ''
      if (this.keyword.timeRange && this.keyword.timeRange.length) {
        this.keyword.startDate = this.keyword.timeRange[0]
        this.keyword.endDate = this.keyword.timeRange[1]
      }
      // 删除前验证是否有输入查询字段
      this.isPass = false
      this.$refs.pageHeadForm.validate((valid) => {
        if (this.isPass) {
          let _this = this
          _this.$confirm('此操作将永久删除该列表, 是否继续?').then(() => {
            _this.$emit('del', _this.keyword)
          }).catch(err => {})
        } else {
          this.$message.error('请至少输入一项查询条件')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.page-head {
  .search-form{
    .el-form-item__error{
      display: none;
    }
  }
}
</style>
