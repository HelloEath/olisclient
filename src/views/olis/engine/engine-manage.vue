<template>
  <div class="page-wrap">
    <page-head
      :tips="tips"
      @add="add"
      @searchFilter="searchFilter">
    </page-head>
    <div class="page-main">
      <el-card class="table-card">
        <lb-table
          max-height="550"
          :column="tableData.column"
          :data="engineList.content"
          :total="Number(engineList.totalElements)"
          pagination
          background
          border
          :currentPage="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          @p-current-change="pCurrentChange">
        </lb-table>
      </el-card>
    </div>

    <dialog-form
      :title="dialogForm.title"
      :type="dialogForm.type"
      :rowData.sync="dialogForm.rowData"
      @refresh="refreshTextData"
      :show.sync="dialogForm.dialogVisible">
    </dialog-form>

    <el-dialog title="编辑图片" :visible.sync="engineImgDialogVisivle" >
      <el-form
        class="rowData" style="margin: 0px auto;width: 500px"
      >
        <el-form-item
          class="required"
          label="发动机名称："
          label-width="120px"
        >
          <el-select
            v-model="dialogForm.rowData.imgMaterial.id"
          >
            <el-option
              :label="item.imgMaterial.materialName"
              :value="item.imgMaterial.id"
              v-for='(item, i) in allImgTypeBaseList'
              :key='i'>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <div style="margin: 0px auto;width: 200px">
            <el-button
              type="primary"
              @click="saveImg"
              :loading="buttonLoading">确 定
            </el-button>
            <el-button @click="clearData">取 消</el-button>
          </div>

        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="Api列表" :visible.sync="ApiDialogTableVisible" >
      <div>
        <lb-table
          :column="apiTableData.column"
          :data="ApiDialogForm.apiList"
          background
          border
        >
        </lb-table>
      </div>
    </el-dialog>

    <el-dialog
      title="编辑Api"
      :visible.sync="ApiDialogEditVisible"
    >
      <el-scrollbar style="height: 100%;">
        <span class="dialog-tips">此 "<i> * </i>" 标记为必填选项，请正确填写内容！</span>
        <el-form
          class="rowData"
          :model="apiRowData"
          :rules="apiRules"
          ref="apiRowData"
        >


          <el-form-item
            class="required"
            label="名称："
            label-width="100px"
            prop="apiName"

          >
            <el-input
              v-model.trim ="apiRowData.apiName"
              auto-complete="off"
              placeholder="请输入名称"
            >
            </el-input>

          </el-form-item>


          <el-form-item
            class="required"
            label="描述1："
            label-width="100px"

          >
            <el-input type="textarea"
                      v-model="apiRowData.desc1"
                      auto-complete="off"
                      placeholder="请输入描述1"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            class="required"
            label="描述2："
            label-width="100px"

          >
            <el-input type="textarea"
                      v-model="apiRowData.desc2"
                      auto-complete="off"
                      placeholder="请输入描述2"
            >
            </el-input>
          </el-form-item>

          <el-form-item
            class="required"
            label="描述3："
            label-width="100px"

          >
            <el-input type="textarea"
                      v-model="apiRowData.desc3"
                      auto-complete="off"
                      placeholder="请输入描述3"
            >
            </el-input>
          </el-form-item>


          <el-form-item class="btns">
            <el-button
              type="primary"
              @click="saveNewApi"
              :loading="buttonLoading">保存
            </el-button>
          </el-form-item>
        </el-form>
      </el-scrollbar>
    </el-dialog>


  </div>
</template>

<script>
  import pageHead from '../../../components/olis/common/page_head_manege.vue'
  import LbTable from '@/components/lb-table/lb-table'
  import dialogForm from './dialog-form-engine-manage'
  import { mapState, mapGetters, mapActions } from 'vuex'
  import { getStore } from '@/common/utils.js'
  import {server} from "./../../../common/ajax.js"

  export default {
    name: 'activityIndexEntry',

    components: {
      pageHead,
      LbTable,
      dialogForm,
    },

    data() {
      return {
        tips:'请输入名称',
        dialogForm: {
          title: '',
          type: '',
          rowData: {
            brand:{
              id:''
            },
            one: {
              id:''
            },
            two: {
              id:''
            },
            three: {
              id:''
            },
            year:{
              id:''
            },
            engineType: {
              id: null
            },
            imgMaterial: {
              id: null
            },
            saeDescList:[]
          },
          dialogVisible: false
        },
        apiRowData:{},
        dialogTableVisible: false,
        ApiDialogTableVisible:false,
        engineImgDialogVisivle:false,
        ApiDialogEditVisible:false,
        buttonLoading:false,
        keyword: {},
        olisKeyword:{},
        ApiDialogForm:{
          apiList:[],
        },
        eventId: '',
        logErrorShow: false,
        currentPage: 1,
        olisCurrentPage:1,
        imgUrlHead:'',
        apiRules: {
          apiName: [
            {
              required: true,
              message: '请选输入名称',
              trigger: 'blur'
            },


          ],

        },
        apiTableData:{
          column: [
            {
              type:"index",
              index:1,
            }
            ,
            {
              prop: 'apiName',
              label: '名称',

            },
            {
              prop: 'desc1',
              label: '描述一',
              render: (h, scope) => {
                return <span>{ scope.row.desc1 || '无' }</span>
              }
            },
            {
              prop: 'desc2',
              label: '描述二',
              render: (h, scope) => {
                return <span>{ scope.row.desc2 || '无' }</span>
              }
            },
            {
              prop: 'desc3',
              label: '描述三',
              render: (h, scope) => {
                return <span>{ scope.row.desc3 || '无' }</span>
              }
            },
            {
              label: '操作',
              render: (h, scope) => {
                return (
                  <div>
                  <el-button
                type="text"
                size="mini"
                onClick={ () => { this.editOneApi(scope.row) } }>
                编辑
                </el-button>
                </div>
              )
              }
            }
          ]

        },
        tableData: {
          column: [
            {
              prop: 'imgMaterial.materialName',
              label: '名称',
              render: (h, scope) => {
                return <span>{ scope.row.imgMaterial.materialName || '无' }</span>
              }
            },
            {
              prop: 'brand.brandName',
              label: '品牌',
              render: (h, scope) => {
                return <span>{ scope.row.brand.brandName || '无' }</span>
              }
            },
            {
              prop: 'one.carTypeName',
              label: '一级分类',
              render: (h, scope) => {
                return <span>{ scope.row.one.carTypeName || '无' }</span>
              }
            },
            {
              prop: 'two.carTypeName',
              label: '二级分类',
              render: (h, scope) => {
                return <span>{ scope.row.two.carTypeName || '无' }</span>
              }
            },
            {
              prop: 'three.carTypeName',
              label: '三级分类',
              render: (h, scope) => {
                return <span>{ scope.row.three.carTypeName || '无' }</span>
              }
            },
            {
              prop: 'engineType.year.keyYearWords',
              label: '年限',
              render: (h, scope) => {
                return <span>{ scope.row.engineType.year.keyYearWords || '无' }</span>
              }
            },
            {
              prop: 'engineType.engineTypeName',
              label: '分类',
              render: (h, scope) => {
                return <span>{ scope.row.engineType.engineTypeName || '无' }</span>
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
              label: '操作',
              render: (h, scope) => {
                return (
                  <div>
                  <el-button
                type="text"
                size="mini"
                onClick={ () => { this.edit(scope.row) } }>
                编辑
                </el-button>
                <el-button
                type="text"
                size="mini"
                onClick={ () => { this.editApi(scope.row) } }>
                编辑API
                </el-button>
                <el-button
                type="text"
                size="mini"
                // disabled="scope.row.status === 1"
                onClick={ () => { this.editEngineImg(scope.row) } }>
                编辑图片
                </el-button>
                <el-button
                type="text"
                size="mini"
                // disabled="scope.row.id === 1"
                onClick={ () => { this.del(scope.row) } }>
                删除
                </el-button>
                </div>
              )
              }
            }
          ]
        },
      }
    },

    created() {
      this.getEngineList({ pageNo: 1 });
      this.imgUrlHead=server.substring(0,server.length-1);

    },

    watch:{
      "apiList"(val){
        this.ApiDialogForm.apiList=val;
      }
    },
    computed: {
      ...mapGetters([
        'engineList','apiList','allImgTypeBaseList'
      ]),
    },
    methods: {
      ...mapActions([
        'getEngineList','deleteEngine','getApiList','saveSaeDetail','getAllImgBaseListByType','saveEngineDetail'
      ]),
      add() {
        this.dialogForm.title = '发动机管理';
        this.dialogForm.type = 'add';
        this.dialogForm.rowData = {
          brand:{
            id:''
          },
          one: {
            id:''
          },
          two: {
            id:''
          },
          three: {
            id:''
          },
          year:{
            id:''
          },
          engineType: {
            id: null
          },
          imgMaterial: {
            id: null
          },
          saeDescList:[]
        }
        this.dialogForm.dialogVisible = true;
      },
      refreshApiList(){
        this.getApiList(this.ApiDialogForm.ApiParams);

      },
      saveNewApi(){
        this.$refs['apiRowData'].validate((valid) => {
          if (valid) {
            this.buttonLoading = true;
            this.saveSaeDetail(this.apiRowData).then(res => {
              if (res.code == 0) {
                this.$message.success('信息保存成功');
                this.ApiDialogEditVisible=false;
                this.refreshApiList();
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
      editOneApi(row){
        this.apiRowData = JSON.parse(JSON.stringify(row));
        this.ApiDialogEditVisible=true;

      },
      editApi(row){
        this.ApiDialogTableVisible=true;
        this.ApiDialogForm.ApiParams={engineTypeId:row.engineType.id,threeId:row.three.id};
        this.getApiList(this.ApiDialogForm.ApiParams);

      },
      editEngineImg(row){
        this.engineImgDialogVisivle=true;
        this.dialogForm.rowData = JSON.parse(JSON.stringify(row));
      },
      saveImg(){
        this.saveEngineDetail(this.dialogForm.rowData).then(res => {
          if (res.code == 0) {
            this.$message.success('信息保存成功');
            this.refreshTextData();
            this.clearData();
          }
          this.buttonLoading = false;

        })
      },
      clearData(){
        this.engineImgDialogVisivle=false;
      },
      edit(row) {
        this.dialogForm.title = '编辑发动机信息';
        this.dialogForm.type = 'edit';
        this.dialogForm.rowData = JSON.parse(JSON.stringify(row));
        this.dialogForm.dialogVisible = true;
      },

      del(row) {
        this.$confirm('您确定需要删除 '+row.imgMaterial.materialName+'  吗？', {
          confirmButtonText: '确定删除',
          cancelButtonText: '再考虑下',
          type: 'warning'
        }).then(() => {
          this.deleteEngine(row.id).then(res=>{
            if(res.code==0){
              this.$message.success('删除成功');
              this.refreshTextData();
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },

      refreshTextData() {
        this.keyword.pageNo = 1;
        this.getEngineList(this.keyword);
      },

      //分页当前页码值改变时请求对应列表数据
      pCurrentChange(val) {
        this.currentPage = val;
        this.keyword.pageNo = val;
        this.getEngineList(this.keyword);
      },
      //列表过滤
      searchFilter(val) {
        this.currentPage = 1;
        //this.keyword = Object.assign({}, val)
        this.keyword.engineName=val.keyWorlds;
        this.keyword.pageNo = 1;
        this.getEngineList(this.keyword);
      }
    },
  }
</script>
<style lang="scss">
  .el-dialog{
    width: 82%;
    left: 58%;
  }
  .page-wrap {
    .page-main {
      .el-table__row {
        .el-button--text {
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
  }

</style>



