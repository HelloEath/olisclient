<template>
  <div class="page-wrap">
    <!-- <page-head @add="add"></page-head> -->
    <el-row type="flex" style="padding: 10px; justify-content: flex-end;">
      <el-button
        size="small" 
        class="button-item" 
        type="primary"
        @click="add">
        新增菜单<i class="el-icon-plus el-icon--right"></i>
      </el-button>
    </el-row>

    <el-card class="table-card">
      <lb-table 
        :column="tableData.column"
        :data="menuList"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      </lb-table>
    </el-card>
    <dialog-form
        :title="dialogForm.title"
        :rowData="dialogForm.rowData"
        :show.sync="dialogForm.dialogVisible">
    </dialog-form>
  </div>
</template>
<script>
import pageHead from './page_head.vue'
import LbTable from '@/components/lb-table/lb-table'
import dialogForm from './dialog_form.vue'
import { mapGetters, mapActions } from 'vuex'
import { deleteMenu } from '@/api/permission'
import { getStore } from '@/common/utils'
  export default {
    name: 'userIndex',
    components: {
      pageHead,
      LbTable,
      dialogForm
    },
    data () {
      return {
        dialogForm: {
          title: '',
          rowData: {},
          dialogVisible: false
        },
        tableData: {
          column: [
            {
              prop: 'name',
              label: '菜单名称'
            },
            {
              prop: 'parentId',
              label: '上级菜单',
              render: (h, scope) => {
                return <span>{ this.$options.filters.getParentName(scope.row.parentId) }</span>
              }
            },
            {
              prop: 'path',
              label: '路径',
              render: (h, scope) => {
                return <span>{ scope.row.path || '无' }</span>
              }
            },
            {
              prop: 'iconCls',
              label: '图标',
              render: (h, scope) => {
                return <span>{ scope.row.iconCls || '无' }</span>
              }
            },
            {
              prop: 'sorting',
              label: '优先级',
              render: (h, scope) => {
                return <span>{ scope.row.sorting || '无' }</span>
              }
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
    created () {
        this.getMenuList({})
    },
    computed:{
      ...mapGetters(['menuList']),
    },
    methods: {
      ...mapActions([
        'getMenuList'
      ]),
      add() {
          this.dialogForm.title = '新增菜单';
          this.dialogForm.rowData = { name: '', parentId: '-1', sorting: 0 };
          this.dialogForm.dialogVisible = true;
      },
      edit(row) {
          this.dialogForm.title = '编辑菜单';
          this.dialogForm.rowData = JSON.parse(JSON.stringify(row));
          this.dialogForm.dialogVisible = true;
      },
      del(row) {
          this.$confirm('您确定需要删除菜单'+row.name+'吗？', {
              confirmButtonText: '确定删除',
              cancelButtonText: '再考虑下',
              type: 'warning'
          }).then(() => {
            deleteMenu(row.id).then(res=>{
                if (res.data == 'true') {
                    this.$message.success('删除菜单成功');
                    this.getMenuList()
                } else {
                    this.$message.error('此菜单与其他角色有关联，删除失败！');
                }
            }).catch(error=>{
                this.$message.error('删除菜单失败，请重试');
            })
        }).catch(error=>{})
      }
    }
  }
</script>
