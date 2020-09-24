<template>
  <el-dialog
    :title="title"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :show="show"
    :modal-append-to-body="false"
  >
    <el-scrollbar style="height: 100%;">
      <span class="dialog-tips">此 "<i> * </i>" 标记为必填选项，请正确填写内容！</span>
      <el-form
        class="rowData"
        :model="rowData"
        :label-width="formLabelWidth"
        ref="rowData"
      >
        <el-form-item label="授权状态" >
          <el-select
            v-model="rowData.devicePermission"
            placeholder="请选择授权状态">
            <el-option
              v-for="(enu, index) in enumerate.devicePermission"
              :key="index"
              :label="enu.name"
              :value="enu.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          class="required"
          label="剩余次数："
          label-width="100px"
          >
          <el-input
            type="number"
            :min="0"
            @keyup.native="number"
            v-model="rowData.deviceSearchCount"
            placeholder="请输入剩余次数">
          </el-input>
        </el-form-item>
        <el-form-item class="btns" >
          <el-button
            type="primary"
            @click="save"
            :loading="buttonLoading">确 定
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
  import * as enumerate from '@/setting/enumerate/enumerate'

  export default {
    name: 'menu-form',
    mixins: [dialogMixin],
    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'add'
      },
      rowData: {
        type: Object,
        default: {}
      }
    },
    data() {
      //数据
      return {
        enumerate,
        rolesList: [],
        buttonLoading: false,
        formLabelWidth: '100px'
      }
    },


    methods: {
      ...mapActions([
        'savedeviceDetail'
      ]),

      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.savedeviceDetail(this.rowData).then(res => {
              if (res.code == 0) {
                this.buttonLoading = false;
                this.$message.success('信息保存成功');
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
