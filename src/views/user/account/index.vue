<template>
  <div class="page-wrap">
    <page-head
      @add="add"
      @search="searchFilter">
    </page-head>

    <el-row type="flex" style="padding: 10px; justify-content: flex-end;">
      <el-button
        size="small" 
        class="button-item" 
        type="primary"
        @click="add">
        新建用户<i class="el-icon-plus el-icon--right"></i>
      </el-button>
    </el-row>
  
    <div class="page-main">
        <el-card class="table-card">
          <lb-table 
            :column="tableData.column"
            :data="users.content"
            :total="Number(users.totalElements)"
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

    <dialog-form
        :title="dialogForm.title"
        :type="dialogForm.type"
        :rowData="dialogForm.rowData"
        @refresh="refreshTextData"
        :show.sync="dialogForm.dialogVisible">
    </dialog-form>
  </div>
</template>

<script>
import pageHead from './page_head.vue'
import LbTable from '@/components/lb-table/lb-table'
import dialogForm from './dialog_form.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import { getStore } from '@/common/utils.js'

export default {
    name: 'systemLog',

    components: {
        pageHead,
        LbTable,
        dialogForm
    },

    data() {
      return {
        dialogForm: {
          title: '',
          type: '',
          rowData: {
            username: '',
            uCode: '',
            name: '',
            phone: null,
            password:'',
            pwd:'',
            role: {
              id: null
            },
            region: {
              id: null
            },
            email: ''
          },
          dialogVisible: false
        },
        keyword: {},
        eventId: '',
        logErrorShow: false,
        currentPage: 1,
        tableData: {
          column: [
            {
              prop: 'username',
              label: '登录账号'
            },

            {
              prop: 'name',
              label: '用户名'
            },

            {
              prop: 'role.name',
              label: '用户角色',
              render: (h, scope) => {
                return <span>{ scope.row.role.name || '无' }</span>
              }
            },

            {
              prop: 'region.regionName',
              label: '地区',
              render: (h, scope) => {
                return <span>{scope.row.region? scope.row.region.regionName : '无' }</span>
              }
            },
            {
              prop: 'showStatus',
              label: '账户状态'
            },
            {
              label: '操作',
              render: (h, scope) => {
                return (
                  <div>
                    <el-button 
                    type="text" 
                    size="mini"
                    onClick={ () => { this.edit(scope.row) } }>
                    修改资料
                    </el-button>

                    <el-button
                    type="text" 
                    size="mini" 
                    // disabled="scope.row.id === 1"
                    onClick={ () => { this.del(scope.row) } }>
                    删除账号
                    </el-button>
                  </div>
                )
              }
            }
          ]
        }
      }
    },

    created() {
      this.getUserList({ pageNo: 1 });
      this.getRoles({});
    },

    computed: {
      ...mapGetters([
        'users',
        'roles',
        'accountlist'
      ]),
    },
    methods: {
      ...mapActions([
        'getUserList',
        'getUser',
        'delUser',
        'lockUser',
        'resetUserPassword',
        'getRoles'
      ]),

      add() {
        this.dialogForm.title = '新增用户';
        this.dialogForm.type = 'add';
        this.dialogForm.rowData = {
          username: '',
          uCode: '',
          name: '',
          phone: null,
          password:'',
          pwd:'',
          role: {
            id: null
          },
          region: {
            id: null
          },
          email: ''
        }
        this.dialogForm.dialogVisible = true;
      },

      edit(row) {
        this.dialogForm.title = '编辑用户信息';
        this.dialogForm.type = 'edit';
        this.dialogForm.rowData = JSON.parse(JSON.stringify(row));
        this.$set(this.dialogForm.rowData, 'pwd', this.dialogForm.rowData.password);//解决赋值后无法输入新值问题
        this.dialogForm.dialogVisible = true;
      },

      reset(row) {
        this.$confirm('您确定重置登录账号'+row.username+'的密码吗？重置密码后，该登录账号密码默认为888888', '您确定需要重置该登录账号密码吗', {
          confirmButtonText: '确定重置',
          cancelButtonText: '再考虑下',
          type: 'warning'
        }).then(() => {
          this.resetUserPassword(row.id).then(res=>{
            if(res.code==0){
              this.$message.success('重置密码成功');
              this.refreshTextData();
            }
          })
        }).catch(() => {
          this.$message.info('已取消重置密码');
        });
      },

      forbid(row) {
        this.$confirm('您确定需要禁用登录账号'+row.username+'吗？禁用账号后，该登录账号将不能正常登陆', '您确定需要禁用该登录账号吗', {
          confirmButtonText: '确定禁用',
          cancelButtonText: '再考虑下',
          type: 'warning'
        }).then(() => {
          this.lockUser(row.id).then(res=>{
            if(res.code==0){
              this.$message.success('禁用成功');
              this.refreshTextData();
            }
          })
        }).catch(() => {
          this.$message.info('已取消禁用');
        });
      },

      del(row) {
        this.$confirm('您确定需要删除登录账号'+row.username+'吗？删除账号后，该登录账号将不能正常登陆', '您确定需要删除该登录账号吗', {
          confirmButtonText: '确定删除',
          cancelButtonText: '再考虑下',
          type: 'warning'
        }).then(() => {
          this.delUser(row.id).then(res=>{
            if(res.code==0){
              this.$message.success('删除用户信息成功');
              this.refreshTextData();
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },

      refreshTextData() {
        this.keyword.pageNo = 1;
        this.getUserList(this.keyword);
      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.getUserList(this.keyword);
      },

      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        this.keyword = Object.assign({}, val)
        this.keyword.pageNo = 1;
        this.getUserList(this.keyword);
      }
    },
}
</script>
<style lang="scss">
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
