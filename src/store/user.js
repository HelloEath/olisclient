import { Loading, Message } from "element-ui"
import * as ajax from "../common/ajax"
import * as utils from "../common/utils"
import { getDataList } from './../common/ajax.js'
import axios from 'axios'
import {setStore, getStore, setCascader} from './../common/utils.js'
// export const Get_USER_Detail = 'Get_USER_Detail' //获取登录用户信息updateUserDetail
// export const Update_USER_Detail = 'Update_USER_Detail' //获取登录用户信息

const state = {
  /**
   *   @param 7.23修改版
   *   @param users 用户集合
   *   @param users 用户详细信息
   *   @param userDetail 当前用户详细信息数据
   *   @param roles 角色集合
   *   @param role 角色详细数据
   *   @param  permission 权限集合
   **/
  users: {},
  user: {},
  userDetail: {},
  roles: [],
  role: {},
  permission: [],
  validateUser: false,
  logData: [],
  errorData: [],
  menuList: [],
};

const getters = {
  users: state => state.users,
  user: state => state.user,
  userDetail: state => state.userDetail,
  roles: state => state.roles,
  role: state => state.role,
  permission: state => state.permission,
  validateUser: state => state.validateUser,
  logData: state => state.logData,
  errorData:state => state.errorData,
  menuList: state => state.menuList,
};

const mutations = {
  updateUsers(state, users) {
    if (users) {
      //users=users.content.filter(item => item.op==0)
      state.users = users;
      users.content.forEach(user => {
        user.status === 1 ?
          user.showStatus = '禁用' :
          user.showStatus = '启用';
      });

    } else {
      return;
    }
  },
  updateUser(state, user) {
    state.user = user;
  },
  updateLogs(state, logData) {
    state.logData = logData;
  },
  updateError(state, errorData) {
    state.errorData = errorData
  },
  updateUserDetail(state, userDetail) {
    state.userDetail = userDetail;
  },
  updateRoles(state, roles) {
    roles=roles.filter(ele => ele.code ==null);
    state.roles = roles;
  },
  updateRole(state, role) {
    state.role = role;
  },
  updatePermission(state, permission) {
    state.permission = permission;
  },
  updateValidateUser(state, bool) {
    state.validateUser = bool;
  },
  updateMenuList(state, data) {
      let parent_menu = data.filter(x=> !x.parentId);
      parent_menu.forEach(val=>{
        if (val.children.length > 0) {
          val.children.sort(utils.compare("sorting"))
        }
      })
      setStore('parent_menu', parent_menu)
      state.menuList = parent_menu;
  },
  updateCustomerDataPackageList(state, data) {
      state.customerDataPackageList = data;
  },
};

const actions = {
  /**
   * 通过api访问服务端，获取当前用户
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getUserDetails({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    return new Promise(resolve => {
      ajax.get('user/current-user', params, (res) => {
        commit('updateUserDetail', res.data)
        const param = {};
        param.name = this.userDetail.name;
        param.username = this.userDetail.username;
        dispatch('getUsers', param);
        if(res.code==0){
        }
        resolve(res)
      })
    })
  },

  /**
   * 通过api访问服务端，获取用户集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  // getUsers({
  //   dispatch,
  //   commit,
  //   state,
  //   rootState
  // }, params) {
  //   getDataList()
  //   // return new Promise(resolve => {
  //   //   ajax.get('user/getusers', params, (res) => {
  //   //     commit('updateUsers', res.data);
  //   //     commit('Change_Global_Loading')
  //   //     if(res.code==0){

  //   //     }
  //   //     resolve(res);
  //   //   })
  //   // })
  // },
  getUserList ({commit}, params=''){
      commit('Change_Global_Loading', true)
      getDataList('/user/getusers',params).then(res=>{
          let data = res.data;
          commit('updateUsers', data);
          commit('Change_Global_Loading', false);
          setStore('SetParams',params);
          setStore('NumberOfElements',data.numberOfElements);
      }).catch(function (error) {
          setStore('SetParams','')
          console.log(error);
      });
   },
   
   /**
   * 通过api访问服务端，获取系统日志列表
   * @param params
   */
   getLogs({commit}, params=''){
      commit('Change_Global_Loading', true)
      getDataList('/common/system-log', params).then(res=>{
          let data = res.data;
          commit('updateLogs', data);
          commit('Change_Global_Loading', false);
          setStore('SetParams', params);
          setStore('NumberOfElements', data.numberOfElements);
      }).catch(function (error) {
          setStore('SetParams','')
          console.log(error);
      });
    },

    /**
     * 通过api访问服务端，获取系统错误日志
     * @param params
     */
    getLogError ({commit}, eventId) {
      return new Promise(resolve => {
          ajax.get(`common/logging-event-exception/${eventId}`,{
              query:''
          },(res) =>{
              resolve(res.data)
          })
      })
  },
  /**
   * 通过api访问服务端，删除系统日志列表
   * @param params
   */
  delLogs ({
    commit
  }, params = '') {
    return new Promise(resolve => {
      ajax.del('common/del-system-log', {
        params,
        timeout: 0
      }, (delRes) => {
        resolve(delRes)
        //结果返回后再次请求查询数据
        getDataList('/common/system-log', params).then(res => {
          let data = res.data
          commit('updateLogs', data)
          setStore('SetParams', params)
          setStore('NumberOfElements', data.numberOfElements)
        }).catch(err => {
          setStore('SetParams', '')
          console.log(err)
        })
      })
    })
  },

    // getLogError({commit}, eventId){
    //   axios.get(`/common/logging-event-exception/${eventId}`).then( (res) => {
    //       commit('updateError',res.data);
    //       //console.log(res.data)
    //   }).catch( (error) => {
    //       console.log(error)
    //   })
    // },

  /**
   * 通过api，获取用户详细信息
   * @param obj
   */
  getUser({
    dispatch,
    commit,
    state,
    rootState
  }, id) {
    return new Promise(resolve => {
      ajax.get(`user/user/${id}`, {
        query: ''
      }, (res) => {
        commit('updateUser', res.data);
        resolve(res);
      })
    })
  },

  /**
   * 通过api访问服务端，新增用户
   * @param params
   */
  saveNewUser({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    axios.post('user/user', params).then((res) => {
      dispatch('getUsers');
      if(res.code==0){
        Message({
          message: '新用户信息提交成功',
          type: 'success'
        });
      }
    })
  },

  /**
   * 通过api访问服务端，编辑用户
   * @param params
   */
  saveUser({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    return new Promise(resolve => {
      ajax.put('user/user', params, (res) => {
        resolve(res);
      })
    })
  },

  /**
   * 通过api访问服务端，禁用用户
   * @param params
   */
  lockUser({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    return axios.post('user/user-lock', params)
  },

  /**
   * 通过api访问服务端，重置密码
   * @param params
   */
  resetUserPassword({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    return axios.post('user/password-reset', params)
  },

  /**
   * 通过api，删除用户
   * @param obj
   */
  delUser({
    dispatch,
    commit,
    state,
    rootState
  }, id) {
    return new Promise(resolve => {
      ajax.del(`user/user/${id}`, {
        query: ''
      }, (res) => {
        resolve(res);
      })
    })
  },
  /**
   * 通过api，获取角色集合
   * @param obj
   */
  getRoles({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    commit('Change_Global_Loading', true)
    return new Promise(resolve => {
      ajax.get('role/getroles', params, (res) => {
        commit('updateRoles', res.data);
        commit('Change_Global_Loading', false)
        // if(res.code==0){
        //   Message({
        //     message: '角色列表加载成功',
        //     type: 'success'
        //   });
        // }
        resolve(res)
      })
    })
  },
  /**
   * 通过api，获取角色详细信息
   * @param obj
   */
  getRole({
    dispatch,
    commit,
    state,
    rootState
  }, id) {
    return ajax.get(`role/role/${id}`, {
        query: ''
      }, (res) => {
        commit('updateRole', res.data);
    })
  },
  /**
   * 通过api，保存新增角色
   * @param obj
   */
  saveNewRole({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    axios.post('role/role', params).then((res) => {
      dispatch('getRoles');
      if(res.code==0){
        Message({
          message: '新角色信息提交成功',
          type: 'success'
        });
      }
    })
  },

  /**
   * 通过api，保存角色
   * @param obj
   */
  saveRole({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    return new Promise(resolve => {
      ajax.put('role/role', params, (res) => {
        resolve(res)
      })
    })
  },

  /**
   * 通过api，删除角色
   * @param obj
   */
  delRole({
    dispatch,
    commit,
    state,
    rootState
  }, id) {
    return new Promise(resolve => {
      ajax.del(`role/role/${id}`, {
        query: ''
      }, (res) => {
        resolve(res);
      })
    })
  },

  /**
   * 通过api，验证账户唯一性
   * @param obj
   */
  validateUserName({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    return ajax.get('validate/uniqueUserChineseName', params, (res) => {
        commit('updateValidateUser', true);
      })
  },
  /**
   * 通过api，获取角色权限集合
   * @param obj
   */
  getPermission({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
    return new Promise(resolve => {
      ajax.get('permission/getpermissions', params, (res) => {
        commit('updatePermission', res.data);
        resolve(res)
      })
    })
  },

  /**
   * 通过api，获取菜单列表
   * @param obj
   */
  getMenuList({
    dispatch,
    commit,
    state,
    rootState
  }, params) {
      commit('Change_Global_Loading', true)
      ajax.get('permission/getpermissions', params, (res) => {
        commit('updateMenuList', res.data);
        commit('Change_Global_Loading', false)
      })
  },



};

export default {
  state,
  getters,
  actions,
  mutations
}
