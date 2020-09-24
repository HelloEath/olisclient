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
        :rules="rules"
        :label-width="formLabelWidth"
        ref="rowData"
      >


        <el-form-item
          class="required"
          label="开始年限："
          label-width="100px"
          prop="startYear"

        >
          <el-input
            v-model="rowData.startYear"
            auto-complete="off"
            placeholder="请输入开始年限"
          >
          </el-input>
        </el-form-item>


        <el-form-item
          class="required"
          label="结束年限："
          label-width="100px"
          prop="endYear"

        >
          <el-input
            v-model="rowData.endYear"
            auto-complete="off"
            placeholder="请输入结束年限"
          >
          </el-input>
        </el-form-item>

        <el-form-item
          class="required"
          label="快捷搜索："
          label-width="100px"
          prop="keyYearWords"

        >
          <el-input
            v-model.trim="rowData.keyYearWords"
            auto-complete="off"
            placeholder="请输入快捷搜索"
          >
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
  import departmentSelect from '@/components/department_select'

  export default {
    name: 'menu-form',
    mixins: [dialogMixin],
    components: { departmentSelect },

    props: {
      title: {
        type: String,
        default: '年限管理'
      },
      type: {
        type: String,
        default: 'add'
      },
      rowData: {
        type: Object,
        default: {
        }
      }
    },

    data() {
      const checkYear = (rule, value, callback) => {
        axios.get('validate/uniqueYear?keyYearWords=' + value).then((res) => {
          if (!res.data) {
            callback(new Error('该记录已存在！！！'));
          } else {
            callback();
          }
        })
      };

      //数据
      return {
        rules: {
          startYear: [{
            required: true,
            message: '请开始年限',
            trigger: 'blur'
          },

          ],
          endYear: [{
            required: true,
            message: '请输入结束年限',
            trigger: 'blur'
          }
          ],
          keyYearWords: [{
            required: true,
            message: '请输入搜索关键字',
            trigger: 'blur'
          },
            {
              required:true,
              validator: checkYear,
            }
          ],
        },
        rolesList: [],
        buttonLoading: false,
        formLabelWidth: '100px'
      }
    },

    methods: {
      ...mapActions([
        'saveYearDetail'
      ]),

      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.saveYearDetail(this.rowData).then(res => {
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
