<template>
  <div class="page-wrap">
    <el-card class="page-head" style="position: relative;">
      <el-form
        :model="keyword"
        class="search-form"
        label-width="80px"
        label-position="right"
        size="small">


        <el-col :span="4">
          <el-form-item label="搜索条件：">
            <el-input
              clearable
              :placeholder="tips"
              v-model="keyword.apiName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4" style="padding-left: 20px">
          <el-button
            type="primary"
            size="small"
            class="button-item"
            @click="searchFilter">
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
      <el-form :model="params"
               class="search-form"
               label-width="80px"
               label-position="right"
               size="small"
               ref="params"
               :rules="apiRules"

      >


        <el-col :span="6" style="width: 350px">
          <el-form-item label="需要修改的api油品名称：" label-width="180px"  prop="oldApiName">
            <el-input
              clearable
              :placeholder="tips"
              v-model="params.oldApiName">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="width: 350px">
          <el-form-item label="新的api油品名称：" label-width="170px" prop="newApiName">
            <el-input
              clearable
              :placeholder="tips"
              v-model="params.newApiName">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="width: 250px">
          <el-form-item label="是否可查看油品图片页：" label-width="180px" prop="newApiName">
            <el-select v-model="params.isClick" >
              <el-option :value="1" label="是"></el-option>
              <el-option :value="0" label="否"></el-option>

            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2" style="padding-left: 20px">
          <el-button
            type="primary"
            size="small"
            class="button-item"
            v-loading="buttonLoading"
            @click="updateApiName">
            确认修改<i class="el-icon-edit-outline el-icon--right"></i>
          </el-button>

        </el-col>


      </el-form>


    </el-card>
    <div class="page-main">
      <el-card class="table-card">
        <lb-table
          max-height="550"
          :column="tableData.column"
          :data="apiDescList.content"
          :total="Number(apiDescList.totalElements)"
          pagination
          background
          border
          :currentPage="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          @p-current-change="pCurrentChange">
        </lb-table>
      </el-card>
    </div>


  </div>
</template>

<script>
  import pageHead from '../../../components/olis/common/page_head_manege.vue'
  import LbTable from '@/components/lb-table/lb-table'
  import {mapState, mapGetters, mapActions} from 'vuex'
  import {getStore} from '@/common/utils.js'
  import {server} from "./../../../common/ajax.js"

  export default {
    name: 'activityIndexEntry',

    components: {
      pageHead,
      LbTable,
    },

    data() {
      return {
        tips: '请输入名称',
        apiRowData: {},
        dialogTableVisible: false,
        ApiDialogTableVisible: false,
        engineImgDialogVisivle: false,
        ApiDialogEditVisible: false,
        buttonLoading: false,
        keyword: {},
        olisKeyword: {},
        ApiDialogForm: {
          apiList: [],
        },
        eventId: '',
        logErrorShow: false,
        currentPage: 1,
        olisCurrentPage: 1,
        imgUrlHead: '',
        params: {
          isClick:0
        },
        apiRules: {
          oldApiName: [
            {
              required: true,
              message: '请选输入名称',
              trigger: 'blur'
            },


          ],
          newApiName: [
            {
              required: true,
              message: '请选输入名称',
              trigger: 'blur'
            },


          ],

        },

        tableData: {
          column: [
            {
              prop: 'apiName',
              label: 'api油品名称',
              render: (h, scope) => {
                return <span>{scope.row.apiName || '无'}</span>
              }
            },

          ]
        },
      }
    },

    created() {
      //this.getEngineList({pageNo: 1});
      this.imgUrlHead = server.substring(0, server.length - 1);

    },

    watch: {
      "apiList"(val) {
        this.ApiDialogForm.apiList = val;
      }
    },
    computed: {
      ...mapGetters([
      'apiDescList'
      ]),
    },
    methods: {
      ...mapActions([
       'updateApiDesc','getApiDescList'
      ]),
      updateApiName() {
        this.$refs['params'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.updateApiDesc(this.params).then(res => {
              if (res.code == 0) {
                if (res.data==0){
                  this.$message.warning('信息修改失败,没有该油品api');
                } else  {
                  this.$message.success('信息修改成功');
                }
              }
              this.buttonLoading = false;

            })

          } else {
            this.$message.warning('修改失败，请确认修改信息是否有错漏！');
            this.buttonLoading = false;
            return false;
          }
        });
      },

      refreshTextData() {
        this.keyword.pageNo = 1;
        this.getApiDescList(this.keyword);
      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.getApiDescList(this.keyword);
      },
      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        this.keyword.pageNo = 1;
        this.getApiDescList(this.keyword);
      },
      resetParams() {
        this.keyword = {};
        this.refreshTextData()
      }
    },
  }
</script>
<style lang="scss">
  .el-dialog {
    width: 82%;
    left: 58%;
  }

  .page-wrap {
    .page-main {
      .el-table__row {
        .el-button--text {
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
  }

</style>



