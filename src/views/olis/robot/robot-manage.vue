<template>
  <div class="page-wrap">
    <el-card class="page-head" style="position: relative;">
      <el-form
        :model="keyword"
        class="search-form"
        label-width="85px"
        label-position="right"
        size="small">

        <el-col :span="5">
          <el-form-item label="设备码：">
            <el-input
              clearable
              :placeholder="tips"
              v-model="keyword.deviceCode">
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="联系方式：">
            <el-input
              clearable
              :placeholder="tips"
              v-model="keyword.deviceProxyNumber">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="代理人：">
            <el-input
              clearable
              :placeholder="tips"
              v-model="keyword.deviceProxy">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item
            class="required"
            label="地区："
          >
            <department-select
              v-model="keyword.deviceRegionId"
              clearable
            >
            </department-select>
          </el-form-item>

        </el-col>
        <el-col :span="4" style="padding-left: 20px">
          <el-button
            type="primary"
            size="small"
            class="button-item"
            @click="searchFilter(keyword)">
            查询<i class="el-icon-search el-icon--right"></i>
          </el-button>

          <el-button
            type="primary"
            size="small"
            class="button-item"
            @click="reset()">
            重置<i class="el-icon-refresh el-icon--right"></i>
          </el-button>
        </el-col>
      </el-form>

    </el-card>
    <div class="page-main">
      <el-card class="table-card">
        <lb-table
          max-height="550"
          :column="tableData.column"
          :data="deviceList.content"
          :total="Number(deviceList.totalElements)"
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
  import LbTable from '@/components/lb-table/lb-table'
  import dialogForm from './dialog-form-robot-manage'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { getStore,getCookie } from '@/common/utils.js'
  import departmentSelect from '@/components/department_select'

  export default {
    name: 'activityIndexEntry',

    components: {
      LbTable,
      dialogForm,
      departmentSelect
    },

    data() {
      return {
        tips:'请输入搜索条件',
        dialogForm: {
          title: '',
          type: '',
          rowData: {},
          dialogVisible: false
        },
        keyword: {
          deviceCode:'',
          deviceProxyNumber:'',
          deviceProxy:'',
          deviceRegionId:''
        },
        eventId: '',
        logErrorShow: false,
        currentPage: 1,
        tableData: {
          column: [
            {
              type:'index',
              index:1,
              label:'序号',
              width:"50"

            },
            {
              prop: 'deviceCode',
              label: '机器码',
            },
            {
              prop: 'createTime',
              label: '添加时间',
              width:"180"

            },
            {
              prop: 'deviceType',
              label: '机器类型',
              render: (h, scope) => {
                return <span>{ scope.row.showDeviceType || '无' }</span>
              }
            },
            {
              prop: 'region.regionName',
              label: '地区',
              render: (h, scope) => {
                return <span>{ scope.row.region.regionName || '无' }</span>
              }
            },
            {
              prop: 'deviceNowRegion',
              label: '现所在地',
            },
            {
              prop: 'deviceProxy',
              label: '代理人',
            },
            {
              prop: 'deviceProxyNumber',
              label: '联系电话'
            },
            {
              prop: 'deviceSearchCount',
              label: '每天剩余查询次数',
              width:"150"

            },
            {
              prop: 'showPermission',
              label: '权限'
            },
            {
              label: '操作',
              width:'100',
              render: (h, scope) => {
                return (
                  <div>
                  <el-button
                type="text"
                size="mini"
                onClick={ () => { this.edit(scope.row) } }>
                编辑
                </el-button>

                <el-button
                type="text"
                size="mini"
                // disabled="scope.row.id === 1"
                onClick={ () => { this.del(scope.row) } }>
                删除
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
      this.getDeviceList({ pageNo: 1 });
    },

    computed: {
      ...mapGetters([
        'deviceList',
        'deviceDetail',
      ]),
    },

    methods: {
      ...mapActions([
        'getDeviceList',
        'getDeviceDetail',
        'savedeviceDetail',
        'deleteDevice',
      ]),

      reset() {
        this.keyword={};
        this.keyword.pageNo = 1;
        this.getDeviceList(this.keyword);
      },
      edit(row) {
        this.dialogForm.title = '编辑设备信息';
        this.dialogForm.type = 'edit';
        this.dialogForm.rowData = JSON.parse(JSON.stringify(row));
        this.dialogForm.dialogVisible = true;
      },
      

      del(row) {
        this.$confirm('您确定需要删除'+row.deviceCode+'吗？', {
          confirmButtonText: '确定删除',
          cancelButtonText: '再考虑下',
          type: 'warning'
        }).then(() => {
          this.deleteDevice(row.id).then(res=>{
            if(res.code==0){
              this.$message.success('删除设备信息成功');
              this.refreshTextData();
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },

      refreshTextData() {
        this.keyword.pageNo = 1;
        this.getDeviceList(this.keyword);
      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.getDeviceList(this.keyword);
      },

      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        this.keyword = Object.assign({}, val)
        this.keyword.pageNo = 1;
        this.getDeviceList(this.keyword);
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



