<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        @close="$emit('update:show', false)"
        :show="show"
        width="540px"
        :modal-append-to-body="false"
        class="userForm"
    >
      <el-scrollbar style="height: 100%;">
        <span class="dialog-tips">此 "<i> * </i>" 标记为必填选项，请正确填写内容！</span>
        <el-form
            class="rowData"
            :model="rowData"
            :rules="rules"
            ref="rowData">
            <el-form-item
              class="required"
              label="名称："
              :label-width="formLabelWidth"
              prop="name">
              <el-input
                v-model.trim="rowData.name"
                placeholder="请输入菜单名称">
              </el-input>
            </el-form-item>
            <el-form-item
              class="required"
              label="父级菜单："
              :label-width="formLabelWidth"
              prop="parentId">
              <el-select v-model="rowData.parentId" clearable>
                  <el-option
                      :label="item.name"
                      :value="item.id"
                      v-for="(item, i) in parent_menu"
                      :key="i">
                  </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              class="required"
              label="路径："
              :label-width="formLabelWidth">
              <el-input
                  v-model="rowData.path"
                  placeholder="路径path">
              </el-input>
            </el-form-item>
            <el-form-item
                class="required"
                label="图标："
                :label-width="formLabelWidth">
                <el-select v-model="rowData.iconCls" clearable>
                    <el-option label="无" value=""></el-option>
                    <el-option
                        :label="`nav_0${i}`"
                        :value="`nav_0${i}`"
                        v-for="i in 9"
                        :key="i">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item
              class="required"
              label="优先级："
              :label-width="formLabelWidth"
              prop="sorting">
            <el-input
              type="number"
              :min="0"
              @keyup.native="number"
              v-model="rowData.sorting"
              placeholder="请输入优先级">
            </el-input>
            </el-form-item>
            <el-form-item class="btns">
            <el-button type="primary" @click="save" :loading="buttonLoading">确 定</el-button>
            <el-button @click="$emit('update:show', false)">取 消</el-button>
            </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-dialog>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  import { getStore } from '@/common/utils'
  import { saveMenu } from '@/api/permission'
  import dialogMixin from '@/mixins/dialog'

  export default {
    name: 'menu-form',
    mixins: [dialogMixin],
    props: {
        title: {
            type: String,
            default: '新建菜单'
        },
        rowData: {
            type: Object,
            default: {
                name: '',
                parentId: '-1',
                path: '',
                iconCls: '',
                id: '',
                sorting: 0
            },
        }
    },
    data () {
      //数据
      return {
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          parentId: [
            { required: true, message: '请选择父级菜单', trigger: 'blur'}
          ]
        },
        buttonLoading: false,
        formLabelWidth: '100px'
      }
    },
    computed: {
        ...mapGetters(['menuList']),
        parent_menu () {
            return [{name: '/', id: '-1'}].concat(this.menuList);
        }
    },
    methods: {
      ...mapActions([
        'getMenuList'
      ]),
      number() {
        this.rowData.sorting=this.rowData.sorting.replace(/[^\.\d]/g,'');
        this.rowData.sorting=this.rowData.sorting.replace('.','');
      },
      save(){
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
              this.buttonLoading = true;
              this.$emit('update:show', false);
              let obj = JSON.parse(JSON.stringify(this.rowData))
              obj.parentId = obj.parentId == '-1' ? '' : obj.parentId;
              saveMenu(obj).then(res=>{
                  this.$message.success('保存成功');
                  this.buttonLoading = false;
                  this.getMenuList({});
              }).catch(error=>{
                  this.buttonLoading = false;
              })
          }
        });
      }
    }
  }
</script>
<style lang="scss">
.userForm {
  .el-dialog {
    height: 80%;
    .el-dialog__body {
      height: 97%;
    }
  }
}
</style>
<style lang="scss" scoped>
.userForm {
  overflow: hidden;
}
.rowData {
    .el-input, .el-select {
        width: 100%;
    }
}
</style>
