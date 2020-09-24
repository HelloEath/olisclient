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
        :label-width="formLabelWidth"
        ref="rowData"
      >

        <el-form-item
          class="required"
          label="用户名："
          prop="username"
        >
          <el-input
            v-model="rowData.username"
            auto-complete="off"
          >
          </el-input>
        </el-form-item>


        <el-form-item
          class="required"
          label="地区："
        >
          <department-select
            v-model="rowData.department.id"
            clearable
            @change="departmentChange"
          >
          </department-select>
        </el-form-item>



        <el-form-item
          class="required"
          label="密码："
        >
          <el-input
            v-model="rowData.phone"
            auto-complete="off"
            :maxlength="11"
          >
          </el-input>

        </el-form-item>


        <el-form-item
          class="required"
          label="确认密码："
        >
          <el-input
            v-model="rowData.email"
            auto-complete="off"
            :maxlength="11"
          >
          </el-input>

        </el-form-item>


        <el-form-item class="btns">
          <el-button
            type="primary"
            @click="save"
            :loading="buttonLoading"
          >
            确 定
          </el-button>
          <el-button @click="$emit('update:show', false)">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
  import axios from 'axios'
  import { mapGetters, mapActions } from 'vuex'
  import { getStore } from '@/common/utils'
  import { saveCustomerDataPackage } from '@/api/customerDataPackage'
  import dialogMixin from '@/mixins/dialog'
  import departmentSelect from '@/components/department_select'
  import * as enumerate from '@/setting/enumerate/enumerate'

  export default {
    name: 'menu-form',
    mixins: [dialogMixin],
    components: { departmentSelect },
    props: {
      title: {
        type: String,
        default: '新建管理员'
      },
      type: {
        type: String,
        default: 'add'
      },
      rowData: {
        type: Object,
        default: {
          username: '',
          uCode: '',
          name: '',
          phone: null,
          email: ''
        }
      }
    },
    data() {
      //验证角色名唯一性
      const checkUserName = (rule, value, callback) => {
        let id = this.rowData.id || '';
        axios.get('validate/uniqueUserChineseName?userName=' + value + '&oldId=' + id).then((res) => {
          if (!res.data) {
            callback(new Error('登录账号已存在！！！'));
          } else {
            callback();
          }
        })
      };
      //验证邮箱
      const checkEmail = (rule, value, callback) => {
        if (value && value != '') {
          setTimeout(() => {
            var reg =
              /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!reg.test(value)) {
              callback(new Error('请输入有效的电子邮箱'));
            } else {
              callback();
            }
          }, 500);
        } else {
          callback();
        }
      }
      //数据
      return {
        enumerate,
        rules: {
          name: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
            {
              min: 2,
              message: '用户名不能少于2位',
              trigger: 'blur'
            },
            {
              max: 20,
              message: '用户名不能多于20位',
              trigger: 'blur'
            }
          ],
          username: [{
            required: true,
            message: '请输入登录账号',
            trigger: 'blur'
          },
            {
              validator: checkUserName,
              trigger: 'blur'
            }
          ],
          email: [{
            validator: checkEmail,
            trigger: 'blur'
          }]
        },
        rolesList: [],
        buttonLoading: false,
        formLabelWidth: '100px'
      }
    },
    computed: {
      ...mapGetters(['roles', 'role', 'permission']),
    },
    watch: {
      "rowData.department.id": function (nId) {
        if (nId) {
          this.departmentChange(nId)
        }
      }
    },
    created() {
      if (this.rowData.department && this.rowData.department.id) {
        this.departmentChange(this.rowData.department.id);
      }
    },
    methods: {
      ...mapActions([
        'saveUser'
      ]),
      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.saveUser(this.rowData).then(res => {
              if (res.code == 0) {
                this.$store.commit('updateValidateUser', false);
                this.buttonLoading = false;
                this.$message.success('用户信息更新成功');
                this.$emit('refresh');
                this.$emit('update:show', false);
              }
            })

          } else {
            this.$message.warning('提交失败，请确认修改信息是否有错漏！');
            this.buttonLoading = false;
            return false;
          }
        });

        // this.$refs['rowData'].validate((valid) => {
        //   if (valid) {
        //       this.$emit('update:show', false);
        //       this.buttonLoading = true;
        //       let arr = [];
        //       this.rowData.checkList.forEach( list => {
        //         this.permission.forEach(item => {
        //           if(item.name === list){
        //             arr.push({"id": item.id,'parentId': item.parentId});
        //           }
        //         })
        //       });
        //       this.rowData.permissions = arr;
        //       this.saveRole(this.rowData).then(res=>{
        //         console.log(res);
        //         if (res.code == '0') {
        //           this.$message.success('保存成功');
        //           this.$emit('refresh');
        //           this.buttonLoading = false;
        //         }
        //       }).catch(error=>{
        //         this.$message.error(error);
        //         this.buttonLoading = false;
        //       })
        //   }
        // });
      },
      departmentChange(val) {
        val
          ? this.rolesList = [].concat(this.roles)
          : this.rolesList = [];
        // this.rolesList = [];
        // const regionList = JSON.parse(getStore('regionList'));
        // const reg = /^0\d+$/g;
        // regionList.map(d => {
        //   if (d.id === val) {
        //     const isChoose = reg.test(d.vCode);
        //     this.roles.map(r => {
        //       if (isChoose) {
        //         if (r.code === 'role_management' || r.code === 'role_operation' || r.code === 'role_approval' ||
        //           d.vCode == '010210000' && r.code === 'role_final' || r.code == 'role_system') this.rolesList.push(r);

        //       } else {
        //         if(!(r.code === 'role_management' || r.code === 'role_operation' || r.code === 'role_approval' || r.code === 'role_final' || r.code == 'role_system') ) this.rolesList.push(r);
        //       }
        //     })
        //   }
        // })
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
  .el-form {
    padding-right: 10px;
  }
  .rowData {
    .el-input,
    .el-select {
      width: 100%;
    }
  }
  .roleBox {
    width: 100%;
    .el-checkbox {
      margin-left: 20px;
    }
    .role_sel {
      display: flex;
      line-height: 30px;
      margin-top: 10px;
      &-tit {
        font: 14px/30px "PingFangSC-Regular", "PingFang SC";
        width: 114px;
        height: 30px;
        background: rgb(242, 242, 242);
        color: #333;
        text-align: center;
      }
      &-list {
        flex: 1;
      }
    }
  }
</style>
