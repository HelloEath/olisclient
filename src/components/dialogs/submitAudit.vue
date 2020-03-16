<template>
      <el-dialog
      title="提交审批"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :modal-append-to-body="false"
      class="submitAudit"
      center>
      <el-form-item label="请选择活动审批人:" label-width="auto">
        <el-row type="flex" justify="space-between">
          <el-select
          class="sel_item"
          v-model="userRoleType"
          placeholder="请选择岗位"
          @change="roleChange">
            <el-option label="分行操作岗" value="role_branch_operation" v-show="userApproval.roleBranchOperation"></el-option>
            <el-option label="分行管理岗" value="role_branch_management" v-show="userApproval.roleBranchManagement"></el-option>
            <el-option label="分行审批岗" value="role_branch_approval" v-show="userApproval.roleBranchApproval"></el-option>
            <el-option label="总行操作岗" value="role_operation" v-show="userApproval.roleOperation"></el-option>
            <el-option label="总行管理岗" value="role_management" v-show="userApproval.roleManagement"></el-option>
            <el-option label="总行审批岗" value="role_approval" v-show="userApproval.roleApproval"></el-option>
            <el-option label="总行终审岗" value="role_final" v-show="userApproval.roleFinal"></el-option>
          </el-select>
          <el-select class="sel_item" v-model="departmentId" placeholder="请选择机构" @change="departmentIdChange">
            <el-option
            :label="dep.deptName"
            :value="dep.deptId"
            v-for="(dep, depi) in regionList"
            :key="depi">
            </el-option>
          </el-select>
          <el-select class="sel_item" v-model="userId" placeholder="请选择审批人">
            <el-option
            :label="item.name"
            :value="item.id"
            v-for="(item, i) in userList"
            v-show="item.name !== department.name"
            :key="i">
            </el-option>
          </el-select>
        </el-row>
      </el-form-item>
      <p class='submit_tips'>根据平台规则，您需要认真核对以下每一条选项，进行风险自查，确认无误后勾选</p>
      <div class="check_box">
        <ul class="submit_ul">
          <li>1.无错字，别字，漏字，序号连续无误</li>
          <li>2.信息准确，与实际情况相一致</li>
          <li>3.符合相关服务章程和服务协议</li>
          <li>4.符合相关保密规定，信息内容中不存在涉密信息和敏感信息</li>
          <li>5.不存在客户信息非法使用或泄漏问题</li>
          <li>6.信息不存在对客户的误导</li>
        </ul>
        <el-checkbox class="submit_urgent" v-model="hadSubmited">已核对</el-checkbox>
        <el-checkbox class="submit_urgent" v-model="urgent">加急审批（如非加急可不选）</el-checkbox>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" :disabled="isSubmit" @click="submit()">确认提交</el-button>
        <el-button @click="closeDialog">返回修改</el-button>
      </span>
    </el-dialog>
</template>

<script>
    import { mapGetters,mapActions } from 'vuex';
    import {setStore, getStore} from './../../common/utils.js';
    import * as ajax from "../../common/ajax.js"
    import dialogMixin from './../../mixins/dialog'
    export default {
        mixins: [dialogMixin],
        data () {
            return {
                userRoleType:'role_operation',
                userId: '',
                userList: null,
                departmentId: null,
                regionList: null,
                hadSubmited:false,
                urgent: false,
                formLabelWidth: '40px',
                isSubmit: false,
                userApproval: {  //审批流程权限
                  roleBranchOperation: false,
                  roleBranchManagement: false,
                  roleBranchApproval: false,
                  roleOperation: false,
                  roleManagement: false,
                  roleApproval: false,
                  roleFinal: false,
                  finalApproval: false
                }
            };
        },
        computed: {
          ...mapGetters(['loginUser']),
          department () {//活动发起方
            return JSON.parse(getStore('currentDepartment'))
          },
        },
        watch: {
            userId(val){
              this.isSubmit = (val!=''&&this.hadSubmited) ? false : true;
            },
            hadSubmited(val){
              this.isSubmit = (val&&this.userId!='') ? false : true;
            }
        },
        created(){
          this.approvalAuthorityManagement();
          this.isSubmit = (this.userId!=''&&this.hadSubmited) ? false : true;
          let user = JSON.parse(getStore('currentUser'));
          this.departmentId = user.department.id;
          this.departmentIdChange();
        },
        methods:{
            ...mapActions(['getusersByRolecode']),
            //获取审批用户角色
            roleChange(){
              if(this.userRoleType === 'null'){
                this.userId = 'null';
                this.departmentId = 'null';
              }
              const obj = {};
              obj.rolecode = this.userRoleType;
              obj.status = 0;
              ajax.get('user/getRegions-by-rolecode', obj, res => {
                this.regionList = res.data;
                if(this.regionList.length >= 1){
                  this.departmentId = this.regionList[0].deptId;
                  this.departmentIdChange();
                }else {
                  this.departmentId = '';
                }
              })
            },
            //获取审批用户部门
            departmentIdChange(){
              const obj = {};
              obj.rolecode = this.userRoleType;
              obj.status = 0;
              obj.departmentId = this.departmentId;
              ajax.get('user/getusers-by-rolecode', obj, res => {
                this.userList = res.data;
                if(this.userList.length === 1){
                  this.loginUser.id === this.userList[0].id?
                  this.userId = '':
                  this.userId = this.userList[0].id;
                }else if(this.userList.length > 1){
                  this.loginUser.id === this.userList[0].id?
                  this.userId = this.userList[1].id:
                  this.userId = this.userList[0].id;
                }else {
                  this.userId = ''
                }
              })
            },
            //获取审批用户
            // roleType (){
            //   let obj = {rolecode:val,status:0};
            //   if(this.userRoleType === 'role_branch_operation'|| this.userRoleType === 'role_branch_management'|| this.userRoleType === 'role_branch_approval'){
            //     obj.departmentId = this.departmentId;
            //   }
            //   this.getusersByRolecode(obj).then(res=>{
            //     if(res.code==0){
            //       let data = res.data;
            //       data.forEach((val,i)=>{
            //         if(val.id == this.loginUser.id){
            //           data.splice(i,1);
            //         }
            //       });
            //       this.userList = data;
            //       this.departmentId = this.userList[0].department.id;
            //       if(this.userList.length === 1){
            //         this.userId = (this.id == this.userList[0].id)?'':this.userList[0].id;
            //       }else if(this.userList.length > 1){
            //         this.userId = (this.id == this.userList[0].id)?this.userList[1].id:this.userList[0].id;
            //       }else {
            //         this.userId = ''
            //       }
            //     }
            //   });
            // },
            //点击保存按钮时根据登录用户划分审批流程权限
            approvalAuthorityManagement() {
              if(this.loginUser){
                if(this.loginUser.role.code === 'role_branch_operation'){ //分行操作岗
                  this.userRoleType = 'role_branch_management';
                  this.userApproval.roleBranchOperation = false;
                  this.userApproval.roleBranchManagement = true;
                  this.userApproval.roleBranchApproval = true;
                  this.userApproval.roleOperation = false;
                  this.userApproval.roleManagement = false;
                  this.userApproval.roleApproval = false;
                  this.userApproval.roleFinal = false;
                }
                // else if(this.loginUser.role.code === 'role_branch_management'){ //分行管理岗
                //   this.userRoleType = 'role_branch_management';
                //   this.userApproval.roleBranchOperation = true;
                //   this.userApproval.roleBranchManagement = true;
                //   this.userApproval.roleBranchApproval = true;
                //   this.userApproval.roleOperation = false;
                //   this.userApproval.roleManagement = true;
                //   this.userApproval.roleApproval = false;
                //   this.userApproval.roleFinal = false;
                // }else if(this.loginUser.role.code === 'role_branch_approval'){ //分行审批岗
                //   this.userRoleType = 'role_branch_approval';
                //   this.userApproval.roleBranchOperation = false;
                //   this.userApproval.roleBranchManagement = true;
                //   this.userApproval.roleBranchApproval = true;
                //   this.userApproval.roleOperation = false;
                //   this.userApproval.roleManagement = true;
                //   this.userApproval.roleApproval = false;
                //   this.userApproval.roleFinal = false;
                // }
                else if(this.loginUser.role.code === 'role_operation'){ //总行操作岗
                  this.userRoleType = 'role_management';
                  this.userApproval.roleBranchOperation = false;
                  this.userApproval.roleBranchManagement = false;
                  this.userApproval.roleBranchApproval = false;
                  this.userApproval.roleOperation = false;
                  this.userApproval.roleManagement = true;
                  this.userApproval.roleApproval = true;
                  this.userApproval.roleFinal = true;
                }
                // else if(this.loginUser.role.code === 'role_management'){ //总行管理岗
                //   this.userRoleType = 'role_management';
                //   this.userApproval.roleBranchOperation = false;
                //   this.userApproval.roleBranchManagement = false;
                //   this.userApproval.roleBranchApproval = false;
                //   this.userApproval.roleOperation = false;
                //   this.userApproval.roleManagement = true;
                //   this.userApproval.roleApproval = true;
                //   this.userApproval.roleFinal = true;
                // }else if(this.loginUser.role.code === 'role_approval'){ //总行审批岗
                //   this.userRoleType = 'role_approval';
                //   this.userApproval.roleBranchOperation = false;
                //   this.userApproval.roleBranchManagement = false;
                //   this.userApproval.roleBranchApproval = false;
                //   this.userApproval.roleOperation = false;
                //   this.userApproval.roleManagement = true;
                //   this.userApproval.roleApproval = true;
                //   this.userApproval.roleFinal = true;
                // }else if(this.loginUser.role.code === 'role_final'){  //总行终审岗
                //   this.userRoleType = 'role_final';
                //   this.userApproval.roleBranchOperation = false;
                //   this.userApproval.roleBranchManagement = false;
                //   this.userApproval.roleBranchApproval = false;
                //   this.userApproval.roleOperation = false;
                //   this.userApproval.roleManagement = true;
                //   this.userApproval.roleApproval = true;
                //   this.userApproval.roleFinal = true;
                // }
                else if(this.loginUser.role.code === 'role_system'){  //系统管理员
                  this.userRoleType = 'role_branch_operation';
                  this.userApproval.roleBranchOperation = true;
                  this.userApproval.roleBranchManagement = true;
                  this.userApproval.roleBranchApproval = true;
                  this.userApproval.roleOperation = true;
                  this.userApproval.roleManagement = true;
                  this.userApproval.roleApproval = true;
                  this.userApproval.roleFinal = true;
                }
              }
              this.roleChange();
            },
            submit(){
              this.isSubmit = true;
              let param = {userId: this.userId,urgent: Number(this.urgent)};
              if (this.userId == '') {
                this.$message.warning('请先选择审核人');
                return;
              }
              if (!this.hadSubmited) {
                this.$message.warning('请确认平台规则为已核对！');
                return;
              }
              this.$emit("submit_audit",param);
              this.hadSubmited = false;
              this.$emit('update:show', false);
            }
        }
    };
</script>
<style lang="scss">
.submitAudit {
  .sel_item {margin:0 2px;}
  .submit_tips {font-size: 14px;font-weight: 600;color:#999;text-align: center;}
  .check_box {
    width:80%;
    margin:25px auto 0;
    overflow: hidden;
    .submit_ul {
      overflow: hidden;
      li {list-style: none;}
    }
    .submit_urgent {margin:5px 0 15px 0;display: block;}
  }
}
</style>
