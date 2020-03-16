<template>
  <div class="page-wrap">
    <!-- <page-head @add="add">
    </page-head> -->

    <el-row type="flex" style="padding: 10px; justify-content: flex-end;">
      <el-button
        size="small" 
        class="button-item" 
        type="primary"
        @click="add">
        新增角色<i class="el-icon-plus el-icon--right"></i>
      </el-button>
    </el-row>
	
    <div class="page-main">
        <el-card class="table-card">
    			<lb-table 
    				:column="tableData.column"
    				:data="roles">
    			</lb-table>
        </el-card>
    </div>
    
    <dialog-form
        :title="dialogForm.title"
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
import { mapGetters, mapActions } from 'vuex'
import { getStore } from '@/common/utils'
  export default {
    name: 'userIndex',
    components: {
      dialogForm,
      pageHead,
		  LbTable
    },
    data () {
      return {
          keyword: {},
          dialogForm: {
            title: '',
            rowData: {},
            dialogVisible: false
          },
		      tableData: {
      			column: [
      				{
      					prop: 'name',
      					label: '角色名称'
      				},
      				{
      					prop: 'description',
      					label: '角色描述'
      				},
      				{
      					label: '操作',
      					render: (h, scope) => {
      						return (
      							<div>
                      <el-button
                        size="mini" 
                        type="primary" 
                        icon="el-icon-edit-outline" 
                        circle 
                        onClick={ () => { this.edit(scope.row) } }>
                      </el-button>
                      <el-button 
                        size="mini" 
                        type="danger" 
                        icon="el-icon-delete"
                        circle
                        disabled
                        onClick={ () => { this.del(scope.row) } }>
                      </el-button>
      							</div>
      						)
      					}
      				}
      			]
  		    }
      }
    },
		computed:{
		  ...mapGetters(['roles', 'permission']),
		},
    created () {
        this.getRoles();
        this.getPermission();
    },
    methods: {
      ...mapActions([
        'getRoles',
        'getPermission',
        'delRole'
      ]),
      add() {
        this.dialogForm.title = '新增角色';
        this.dialogForm.rowData = {
          checkList: []
        };
        this.dialogForm.dialogVisible = true;
      },
      edit(row) {
        this.dialogForm.title = '编辑角色';
        let checkList = [];
        row.permissions.forEach( item => {
          checkList.push(item.name);
        });
        row.checkList = checkList;
        let rowData = JSON.parse(JSON.stringify(row));
        this.dialogForm.rowData = rowData;
        this.dialogForm.dialogVisible = true;
      },
      del(row) {
        this.$confirm('您确定需要删除角色'+row.name+'吗？删除账号后，该角色将不能正常使用', '您确定需要删除该角色吗', {
          confirmButtonText: '确定删除',
          cancelButtonText: '再考虑下',
          type: 'warning'
        }).then(() => {
          console.log(row.id);
          this.delRole(row.id).then(
            () => {
              this.$message.success('删除角色成功');
              this.refreshTextData();
            },
            () => {
              this.$message.error('删除角色失败，请重试');
            }
          )
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
      refreshTextData() {
        this.getRoles();
      }
    }
  }
</script>