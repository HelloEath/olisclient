<template>
  <el-dialog
    title="视图标签选择"
    id="tagSelect"
    :visible.sync="visible"
    @close="$emit('update:show', false)"
    :show="show"
    width="60%"
    :modal-append-to-body="false">
      <el-container v-loading="loading" class="tag-container">
        <el-aside class="tag-aside" style="width: 240px;">
          <el-scrollbar class="no-x-scroll" style="height: 100%;">
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            <el-tree
              class="filter-tree"
              :data="data"
              :props="defaultProps"
              accordion
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree2">
            </el-tree>
          </el-scrollbar>
        </el-aside>
        <el-main class="tag-main" v-loading="tagLoading">
          <div class="tag-main-title">标签：{{tagSelectName}}</div>
          <el-checkbox-group v-model="tagSelect" class="tag-group">
            <el-checkbox v-for="(tag, i) in tagList" :label="tag" :key="i" border>{{tag.name}}</el-checkbox>
          </el-checkbox-group>
          <el-button class="addBtn" v-if="label_type=='2'" type="text" @click="addATag()">{{tagList.length?'修改标签值':'自定义标签'}}</el-button>
        </el-main>
      </el-container>
      <span slot="footer" class="dialog-footer" v-show="!loading">
        <el-button @click="$emit('update:show', false)">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
  </el-dialog>
</template>
<script>
  import { mapActions } from 'vuex'
  import { getStore } from './../../common/utils.js'
  import dialogMixin from './../../mixins/dialog'
  export default {
    mixins: [dialogMixin],
    props: ['parentStr', 'hadSelectedTag'],
    data() {
      return {
        visible: this.show,
        loading: false,
        tagLoading: false,
        filterText: '',
        data: '',
        defaultProps: {
          children: 'children',
          label: 'label_name',
        },
        tagSelectName: '你还没有选择标签',
        tagSelect: [],
        tagList: [],
        inpName: '',//判断自定义的类型
        label_type: '',//判断树节点的类型
        label_attr: '',//点击树节点的label_attr
        newTagValue: '',
      };
    },
    watch: {
        filterText(val) {
          this.$refs.tree2.filter(val);
        }
    },
    computed: {
      ruleLevel1() {
        return JSON.parse(getStore('ruleLevel1'))
      },
      ruleLevel2() {
        return JSON.parse(getStore('ruleLevel2'))
      },
      configurationList() {
        return JSON.parse(getStore('configurationList'))
      },
    },
    created() {
      let configurationList = this.configurationList;
      this.data = this.createTreeData(configurationList);
    },
    methods: {
      ...mapActions(['getRule', 'getDataQuantity']),
      filterNode(value, data) {
        if (!value) return true;
        return data.label_name.indexOf(value) !== -1;
      },
      createTreeData(configurationList) {
        let treeData = [];
        this.ruleLevel1.forEach(val1=>{
          let item = Object.assign({},val1);
          let sArr = [];
          this.ruleLevel2.forEach(val2=>{
            let tArr = configurationList.filter(x=>x.parent_label_id == val2.label_id)
            val2.children = tArr;
            if(val1.label_id == val2.parent_label_id) {
              sArr.push(val2);
            }
            item.children = sArr;
          })
          treeData.push(item);
        })
        return treeData;
      },
      handleNodeClick(node) {
        if (node.label_level == '3') {
          let label_attr = node.label_attr;
          this.label_attr = label_attr;
          if (this.hadSelectedTag.length && this.hadSelectedTag.indexOf(label_attr)>-1) {
            let msg = `当前支线上已经存在该标签，不能重复选择！`;
            this.$message.warning(msg);
            return;
          }
          this.tagLoading = true;
          this.tagSelectName = node.label_name;
          let rowkey = node.rowkey;
          this.getRule(rowkey).then(res=>{
            let data = res.data;
            let label_value_type = data[0].label_value_type;
            if(label_value_type == 'DEFAULTVALUE') {
              this.inpName = '';
              this.label_type = '1';
              let label_value = `${label_attr}=1`;
              this.tagList = [{"type": this.tagSelectName, "name": '是', "label_value": label_value}];
            } else if (label_value_type == 'DEFINEVALUE') {
              let inpName = data[0].reserve_3 == '0'?'DEFINEVALUE_0':'DEFINEVALUE';
              this.inpName = inpName;
              this.label_type = '2';
              this.tagList = [];
            } else {
              this.inpName = '';
              this.label_type = '3';
              let labelList = [];
              for(let i=0,len=data.length;i<len;i++){
                let labelItem = {};
                labelItem.type = this.tagSelectName;
                labelItem.name = data[i].label_value_cname;
                labelItem.label_value = `${label_attr}=${data[i].label_value}`;
                labelList.push(labelItem);
              }
              this.tagList = labelList
            }
            this.tagLoading = false;
          });
          this.tagSelect = [];
        }
      },
      submit() {
        let tagSelect = this.tagSelect;
        if (tagSelect.length) {
          if (tagSelect.length == 1 && !tagSelect[0].label_value) {
            this.$message.warning(`请先输入标签的值`);
            return;
          };
          let arr = [];
          tagSelect.forEach(val=>{
            // let item = this.parentStr ? `${this.parentStr}&${val.label_value}` : val.label_value;
            arr.push(val.label_value);
          });
          let triggerRules = arr;
          this.loading = true;
          let obj = {branch: this.parentStr, triggerRules: triggerRules};
          this.getDataQuantity({branch: this.parentStr, triggerRules: triggerRules}).then(res=>{
            if (res.code == '0') {
              let result = res.data;
              result.forEach((val, i)=>{
                tagSelect[i].value = val;
              });
              this.$emit("addTagList", tagSelect);
              this.$emit('update:show', false);
              this.clearTable();
              this.loading = false;
            }
          })

        } else {
          this.$message.warning('请先选择标签');
        }
      },
      validateTag(value) {
        //在添加规则条件时，检查所选条件输入是否符合规范
        let msg = '';
        if (value == "" || value == null) {
          msg = "所输入的规则条件中存在结果值为空,请确定输入是否正确!";
        } else {
          value = value.trim();
          var pattern1 = new RegExp("^[0-9]\\d*(\\.\\d+)?$|^0(\\.\\d+)?$|^\\'{2}$");
          var pattern2 = new RegExp("^[A-Za-z0-9\u4e00-\u9fa5]+$|^\\'{2}$");
          if (!pattern1.test(value)&&this.inpName=='DEFINEVALUE') {
            msg = "所输入的规则条件中存在非数字类型的值或者空格,请确定输入是否正确!";
          }
          if (!pattern2.test(value)&&this.inpName=='DEFINEVALUE_0') {
            msg = "所输入的规则条件中存在非法字符,请确定输入是否正确!";
          }
        }
        return msg || true;
      },
      addATag() {
        let inputValue = this.tagList.length ? this.tagList[0].name : '';
        this.$prompt('请输入标签值', '标签值', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: inputValue,
          inputValidator: this.validateTag,
          inputPlaceholder: '为空时输入单引号'
        }).then(({ value }) => {
          let label_value = `${this.label_attr}=${value}`;
          this.tagList = [{"type": this.tagSelectName, "name": value, "label_value": label_value}];
          this.tagSelect = [];
          this.$message({
            type: 'success',
            message: '标签值修改成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });
        });
      },
      clearTable() {
        this.tagList = [];
        this.tagSelectName = '你还没有选择标签';
        this.tagSelect = [];
      }
    }
  };
</script>
<style lang="scss">
#tagSelect {
  .el-dialog {
    .el-input {
      width: 220px !important;
      margin: 5px 10px;
      .el-input__inner {
        width: 100% !important;
      }
    }
    .el-dialog__body {
      padding: 0 0 0 2px !important;
    }
    .tag-container {
      .tag-aside {
        width: 250px;
      }
      .tag-main {
        padding: 0;
        background: #f3f3f3;
        border: 2px solid rgb(236, 248, 255);
        .addBtn {margin-left: 20px;}
        .tag-main-title {
          padding-left: 20px;
          line-height: 40px;
          font-size: 14px;
          font-weight: 600;
          color: rgb(94, 109, 130);
          background-color: rgb(236, 248, 255);
          border-bottom: 1px solid rgb(80, 191, 255);
        }
      }
      .tag-group {
        padding: 10px;
        .el-checkbox{
          position: relative;
          margin: 5px;
          background: #fff;
          &__inner {
            border: 1px solid #ddd;
            border-radius: 6px;
            margin: 0 10px 0 5px;
            text-align: left;
            box-shadow:none;
          }
        }
      }
    }
    .el-dialog__footer {
      padding: 20px 0;
    }
  }
}
</style>
