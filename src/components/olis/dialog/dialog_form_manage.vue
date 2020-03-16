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
          label="用户名"
          prop="username"
          label-width="100px"

        >
          <el-input
            v-model="rowData.username"
            auto-complete="off"
          >
          </el-input>
        </el-form-item>


        <el-form-item
          class="required"
          label="地区"
          label-width="100px"

        >
          <department-select
            v-model="rowData.region.id"
            clearable
          >
          </department-select>
        </el-form-item>



        <el-form-item
          class="required"
          label="密码"
          label-width="100px"
          prop="pwd"

        >
          <el-input
            v-model="rowData.pwd"
            auto-complete="off"
            :maxlength="11"
          >
          </el-input>

        </el-form-item>


        <el-form-item
          class="required"
          label="确认密码"
          label-width="100px"
          prop="rePwd"

        >
          <el-input
            v-model="rowData.rePwd"
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
          rePwd: '',
          pwd: '',

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
      };
      const checkRePwd = (rule, value, callback) => {
        if (this.rowData.pwd==this.rowData.rePwd) {
          this.rowData.password=this.rowData.rePwd;
          callback();
        }else {
          callback(new Error('两次输入密码不一致'));
        }
      }
      //数据
      return {
        enumerate,
        rules: {
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
          pwd: [{
            required: true,
            message: '请输入登录密码',
            trigger: 'blur'
          },],
          rePwd: [{
            required: true,
            message: '请输入确认密码',
            trigger: 'blur'
          },
            {
              validator: checkRePwd,
              trigger: 'blur'
            }
          ]
        },
        buttonLoading: false,
        formLabelWidth: '100px'
      }
    },
    computed: {
      ...mapGetters(['roles', 'role', 'permission']),
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
                this.$message.success('信息更新成功');
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

      },

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
  .btns{
    .el-form-item__content{
      margin-left: 0px !important;
    }
  }
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
