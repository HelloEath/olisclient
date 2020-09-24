<template>
    <el-dialog
        :title="title"
        :visible.sync="visible"
        @close="$emit('update:show', false)"
        :show="show"
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
            <el-form-item class="required" label="角色名称：" :label-width="formLabelWidth" prop="name">
              <el-input v-model="rowData.name" auto-complete="off" placeholder="请输入角色名称，如运营专员"></el-input>
            </el-form-item>
            <el-form-item class="required" label="角色描述：" :label-width="formLabelWidth">
              <el-input v-model="rowData.description" auto-complete="off" placeholder="（必填）"></el-input>
            </el-form-item>
            <el-form-item class="required" label="角色授权：" :label-width="formLabelWidth">
              <div class="roleBox">
                <div class="role_sel"
                v-show="p.parentId === null"
                v-for="(p, i) in permission"
                :key="i">
                  <div class="role_sel-tit">{{p.name}}</div>
                  <div class="role_sel-list">
                    <el-checkbox-group v-model="rowData.checkList">
                      <el-checkbox
                      :label="p.name">
                      </el-checkbox>
                      <el-checkbox
                      v-if="child.parentId&&child.parentId === p.id"
                      v-for="(child, idx) in permission"
                      :label="child.name"
                      :key="idx">
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
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
  import { saveCustomerDataPackage } from '@/api/customerDataPackage'
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
                dataType: '',
                dataPackageName: '',
                content: '',
            },
        }
    },
    data () {
      //数据
      return {
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ]
        },
        buttonLoading: false,
        formLabelWidth: '100px'
      }
    },
    computed: {
      ...mapGetters(['role', 'permission'])
    },
    methods: {
      ...mapActions([
        'getCustomerDataPackageList',
        'saveRole'
      ]),
      save(){
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
              this.$emit('update:show', false);
              this.buttonLoading = true;
              let arr = [];
              this.rowData.checkList.forEach( list => {
                this.permission.forEach(item => {
                  if(item.name === list){
                    arr.push({"id": item.id,'parentId': item.parentId});
                  }
                })
              });
              this.rowData.permissions = arr;
              this.saveRole(this.rowData).then(res=>{
                console.log(res);
                if (res.code == '0') {
                  this.$message.success('保存成功');
                  this.$emit('refresh');
                  this.buttonLoading = false;
                }
              }).catch(error=>{
                this.$message.error(error);
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
.roleBox {
  width:100%;
  .el-checkbox {
    margin-left: 20px;
  }
  .role_sel {
    display:flex;
    line-height:30px;
    margin-top:10px;
    &-tit {
      font: 14px/30px 'PingFangSC-Regular', 'PingFang SC';
      width:114px;
      height:30px;
      background:rgb(242,242,242);
      color:#333;
      text-align:center;
    }
    &-list {
      flex:1;
    }
  }
}
</style>
