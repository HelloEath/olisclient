<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="show"
      @close="clearData"
      :modal-append-to-body="false"
    >
      <el-scrollbar style="height: 100%;">
        <span class="dialog-tips">此 "<i> * </i>" 标记为必填选项，请正确填写内容！</span>
        <el-form
          class="rowData"
          :model="rowData"
          :rules="rules"
          ref="rowData"
        >


          <el-form-item
            class="required"
            label="品牌："
            label-width="100px"
            prop="brand.id"

          >
            <el-select
              v-model="rowData.brand.id"
              clearable
              filterable
              @change="brandChange(rowData.brand.id)"
            >
              <el-option
                :label="item.brandName"
                :value="item.id"
                v-for='(item, i) in allBrandList'
                :key='i'>
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item
            class="required"
            label="一级类型："
            label-width="100px"
            prop="one.id"

          >
            <el-select
              v-model="rowData.one.id"
              clearable
              filterable
              @change="oneChange(rowData.one.id)"
            >
              <el-option
                :label="item.carTypeName"
                :value="item.id"
                v-for='(item, i) in oneCarTypeDetail'
                :key='i'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="required"
            label="二级类型："
            label-width="100px"
            prop="two.id"

          >
            <el-select
              v-model="rowData.two.id"
              clearable
              filterable
              @change="twoChange(rowData.two.id)"
            >
              <el-option
                :label="item.carTypeName"
                :value="item.id"
                v-for='(item, i) in twoCarTypeList'
                :key='i'>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            class="required"
            label="三级类型："
            label-width="100px"
            prop="three.id"
            filterable
          >
            <el-select
              v-model="rowData.three.id"
              clearable

            >
              <el-option
                :label="item.carTypeName"
                :value="item.id"
                v-for='(item, i) in threeCarTypeList'
                :key='i'>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="required"
            label="年限："
            label-width="100px"
            prop="year.id"


          >
            <el-select
              v-model="rowData.year.id"
              clearable
              filterable
              @change="yearChange(rowData.year.id)"
            >
              <el-option
                :label="item.keyYearWords"
                :value="item.id"
                v-for='(item, i) in allYearList'
                :key='i'>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="required"
            label="类型："
            label-width="100px"
            prop="engineType.id"

          >
            <el-select
              v-model="rowData.engineType.id"
              clearable
              filterable
            >
              <el-option
                :label="item.engineTypeName"
                :value="item.id"
                v-for='(item, i) in engineTypeDetail'
                :key='i'>
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            class="required"
            label="发动机名称："
            label-width="120px"
            prop="imgMaterial.id"

          >
            <el-select
              v-model="rowData.imgMaterial.id"
              clearable
              filterable
            >
              <el-option
                :label="item.imgMaterial.materialName"
                :value="item.imgMaterial.id"
                v-for='(item, i) in allImgTypeBaseList'
                :key='i'>
              </el-option>
            </el-select>
          </el-form-item>


          <el-form-item
            v-show="isShowSae"
            class="required"
            label="SAE："
            label-width="100px"
            prop="engineSae">
            <el-button
              type="primary"
              @click="addSae"
            >增加SAE
            </el-button>
            <el-button
              type="primary"
              @click="removeSae"
            >移除SAE
            </el-button>


            <el-table
              :data="saeTableData"
              style="width: 100%;margin-top: 20px">
              <el-table-column
                prop="apiName"
                label="api名称"
              >
                <template scope="scope">
                  <el-input
                    v-model="scope.row.apiName"
                    auto-complete="off"
                    placeholder="请输入api名称"
                  >
                  </el-input>
                </template>

              </el-table-column>
              <el-table-column
                prop="engineRank"
                label="排序"
              >
                <template scope="scope">
                  <el-input
                    v-model="scope.row.engineRank"
                    auto-complete="off"
                    placeholder="请输入排序"
                  >
                  </el-input>
                </template>
              </el-table-column>


              <el-table-column
                prop="runKm"
                label="行驶距离">
                <template scope="scope">
                  <el-select
                    v-model="scope.row.runKm"
                  >
                    <el-option :value="item.value" :label="item.label" v-for="item in saeKmOption">
                    </el-option>
                  </el-select>

                </template>
              </el-table-column>
              <el-table-column
                prop="desc1"
                label="描述1">
                <template scope="scope">
                  <el-input
                    type="textarea"
                    v-model="scope.row.desc1"
                    auto-complete="off"
                    placeholder="请输入描述1"
                  >
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column
                prop="desc2"
                label="描述2">

                <template scope="scope">
                  <el-input
                    type="textarea"
                    v-model="scope.row.desc2"
                    auto-complete="off"
                    placeholder="请输入描述2"
                  >
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column
                prop="desc3"
                label="描述3">

                <template scope="scope">
                  <el-input
                    type="textarea"
                    v-model="scope.row.desc3"
                    auto-complete="off"
                    placeholder="请输入描述3"
                  >
                  </el-input>
                </template>
              </el-table-column>

              <el-table-column
                prop="address"
                label="机油">

                <template scope="scope">
                  <el-button
                    type="primary"
                    @click="setOlis(scope)"
                  >设置机油
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>

          <el-form-item class="btns">
            <el-button
              type="primary"
              @click="save"
              :loading="buttonLoading">确 定
            </el-button>
            <el-button @click="clearData">取 消</el-button>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-dialog>

    <el-dialog title="油品选择(单选)" :visible.sync="dialogTableVisible" >
      <div>

        <lb-table
          :column="olisTableData.column"
          :data="imgBaseList.content"
          :total="Number(imgBaseList.totalElements)"
          pagination
          background
          border
          :currentPage="olisCurrentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          @p-current-change="olisPCurrentChange"
          @selection-change="handleSelectionChange"
        >
        </lb-table>

        <div>
          <el-button
            type="primary"
            @click="confirmOlis"
          >确 定
          </el-button>
          <el-button @click="$emit('update:dialogTableVisible', false)">取 消</el-button>

        </div>
      </div>
    </el-dialog>
  </div>

</template>

<script>
  import axios from 'axios'
  import {mapGetters, mapActions} from 'vuex'
  import {getStore} from '@/common/utils'
  import dialogMixin from '@/mixins/dialog'
  import departmentSelect from '@/components/department_select'
  import LbTable from '@/components/lb-table/lb-table'
  import {server} from "./../../../common/ajax.js"

  export default {
    name: 'menu-form',
    mixins: [dialogMixin],
    components: {departmentSelect,LbTable},

    props: {
      title: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'add'
      },
      rowData:{},
    },
    data() {

      return {
        buttonLoading:false,
        threeCarTypeList: [],
        oneCarTypeList: [],
        twoCarTypeList: [],
        saeTableData: [{runKm:"1",olisObject:null}],
        dialogTableVisible: false,
        olisCurrentPage:1,
        olisKeyword:{},
        imgUrlHead:'',
        olisObject:null,
        saeTableCurrentRow:1,
        isShowSae:true,
        olisProtectedOption:[
          {
            value:"1",
            label:"无",
          },
          {
            value:"2",
            label:"基本保护",
          },
          {
            value:"3",
            label:"标准保护",
          },
          {
            value:"4",
            label:"超级保护",
          },
          {
            value:"5",
            label:"特别推荐",
          },
          {
            value:"6",
            label:"经济型",
          },
          {
            value:"7",
            label:"最高性价比",
          },
        ],
        saeKmOption:[
         {
          label:"无限制",
          value:"1",
         },
         {
          label:"超过十五至二十万公里",
          value:"2",
         },
         {
          label:"十五至二十万公里以下",
          value:"3",
         }
        ],
        rules: {
          "brand.id": [
            {
              required: true,
              message: '请选择品牌名称',
              trigger: 'blur'
            },

          ],
          "one.id": [{
            required: true,
            message: '请选择一级车型名称',
            trigger: 'blur'
          },

          ],
          "two.id": [{
            required: true,
            message: '请选择二级车型名称',
            trigger: 'blur'
          },
          ],
          "three.id": [{
            required: true,
            message: '请选择三级类型',
            trigger: 'blur'
          },
          ],
          "year.id": [{
            required: true,
            message: '请选择发动机年限',
            trigger: 'blur'
          },
          ],
          "engineType.id": [{
            required: true,
            message: '请选择发动机类型',
            trigger: 'blur'
          },
          ],
          "imgMaterial.id": [{
            required: true,
            message: '请选择发动机名称',
            trigger: 'blur'
          },
          ],

        },

        olisTableData:{
          column: [
            {
              type:'selection'
            }
            ,
            {
              prop: 'imgMaterial.materialName',
              label: '名称',
              width:"200",
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialName || '无' }</span>
              }
            },
            {
              prop: 'imgMaterial.materialPrize',
              label: '价格',
              width:"200",
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialPrize || '无' }</span>
              }
            },
            {
              prop: 'imgMaterial.materialSae',
              label: 'sae',
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialSae || '无' }</span>
              }
            },
            {
              prop: 'imgMaterial.materialRank',
              label: '排序',
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialRank || '无' }</span>
              }
            },
            {
              prop: 'imgMaterial.uploadFile',
              label: '图片',
              render: (h, scope) => {
                return (
                  <el-popover placement="right" title="" trigger="hover">
                  <el-image
                style="height: 500px;width: 500px"
                src={this.imgUrlHead+(scope.row.imgMaterial.uploadFile?`${scope.row.imgMaterial.uploadFile.path}/${scope.row.imgMaterial.uploadFile.fileName}`:'')}              ></el-image>

                <el-image
                style="width: 70px;height:50px" slot="reference"
                src={this.imgUrlHead+(scope.row.imgMaterial.uploadFile?`${scope.row.imgMaterial.uploadFile.path}/${scope.row.imgMaterial.uploadFile.fileName}`:'')}              ></el-image>
                </el-popover>
              )
              }
            },
            {
              prop: 'imgMaterial.materialProtectedType',
              label: '保护类型',
              render: (h, scope) => {
                return <span><el-select  value={scope.row.imgMaterial.materialProtectedType}
                onChange={(val)=>{scope.row.imgMaterial.materialProtectedType=val}}
              >
                {
                  this.olisProtectedOption.map(option=>{
                    return (
                      <el-option label={option.label} value={option.value}></el-option>
                  )
                  })
                }

              </el-select></span>
              }
            },

          ]
        }
      }
    },

    watch: {
      "twoCarTypeDetail"(val) {
        this.twoCarTypeList = val;
      },
      "threeCarTypeDetail"(val){
        this.threeCarTypeList=val;
      },
      "rowData"(val){
        if (val.brand.id){
          this.getEngineTypeDetail(val.year.id);
          this.getOneCarTypeDetail(val.brand.id);
          this.getTwoCarTypeDetail(val.one.id);
          this.getThreeCarTypeDetail(val.two.id);
        }

      },
      "type"(val){
        if (val=='add'){
          this.isShowSae=true;
        }else {
          this.isShowSae=false;
        }
      }
    },
    created() {
      this.getAllBrandList();
      this.getAllYearList();
      this.getAllImgBaseListByType({materialType:1 });//发动机类型请求
      this.imgUrlHead=server.substring(0,server.length-1);

    },
    computed: {
      ...mapGetters([
        'twoCarTypeDetail',
        'threeCarTypeDetail',
        'allBrandList',
        'oneCarTypeDetail',
        'engineTypeDetail',
        'allYearList',
        'allImgTypeBaseList',
        'imgBaseList'
      ]),
    },
    methods: {
      ...mapActions([
        'getOneCarTypeDetail', 'getTwoCarTypeDetail',
        'getAllBrandList', 'saveThreeCarTypeDetail',
        'getEngineTypeDetail', 'getAllYearList', 'saveEngineDetail',
        'getAllImgBaseListByType','getThreeCarTypeDetail','getImgBaseList'
      ]),
      clearData(){
        this.$emit('update:show', false);
        this.saeTableData=[{runKm:"1",olisObject:null}];

      },
      setOlis(scope) {
      //this.$emit('setOlis');
        this.saeTableCurrentRow=scope.$index;
        this.dialogTableVisible=true;
        this.getImgBaseList({ pageNo: 1,materialType:2 });
      },
      confirmOlis(){
        this.saeTableData[this.saeTableCurrentRow].olisObject=this.olisObject;
        this.dialogTableVisible=false;

      },
      handleSelectionChange(val){
        this.olisObject=val[0];
      },
      olisPCurrentChange(val){
        this.olisCurrentPage = val;
        this.olisKeyword.pageNo = val;
        this.olisKeyword.materialType=2;
        this.getImgBaseList(this.olisKeyword);
      },
      addSae() {
        this.saeTableData.push({runKm:"1",olisObject:null})
      },
      removeSae(){
        this.saeTableData.pop();
      },

      brandChange(id) {
        this.rowData.one.id = null;
        this.rowData.two.id = null;
        this.rowData.three.id=null;
        this.twoCarTypeList = [];
        this.threeCarTypeList = [];
        this.getOneCarTypeDetail(id)
      },
      oneChange(id) {
        this.rowData.three.id=null;
        this.rowData.two.id = null;
        this.threeCarTypeList = [];
        this.getTwoCarTypeDetail(id);
      },

      twoChange(id) {
        this.rowData.three.id = null;
        this.getThreeCarTypeDetail(id);
      },
      yearChange(id) {
        this.rowData.engineType.id=null;
        this.getEngineTypeDetail(id);
      },
      save() {
        this.$refs['rowData'].validate((valid) => {
          if (valid) {
            if (this.type=='add'){

              if (this.saeTableData&&this.saeTableData.length!=0){
                let engineApiNameFlag=false;
                let olisObject=false;
                this.saeTableData.forEach(x=>{
                  if (!x.apiName) {
                    engineApiNameFlag=true;
                    return;

                  }
                  if (!x.olisObject){
                    olisObject=true;
                    return;
                  }
                });
                if (engineApiNameFlag){
                  this.$message.warning('请输入api名称');
                  return;
                }
                if (olisObject){
                  this.$message.warning('请选择机油');
                  return;
                }
              } else {
                this.$message.warning('至少选择一项Sae');
                return;

              }
              this.rowData.saeDescList=this.saeTableData;
            }

            this.buttonLoading = true;
            this.saveEngineDetail(this.rowData).then(res => {
              if (res.code == 0) {
                this.$message.success('信息保存成功');
                this.$emit('refresh');
               this.clearData();
              }
              this.buttonLoading = false;

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
  .btns {
    .el-form-item__content {
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
