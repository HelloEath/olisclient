import {Loading} from "element-ui"
import * as ajax from "../common/ajax"
import * as utils from "../common/utils"
import server from "../common/utils"
import axios from 'axios'
import {setStore, getStore} from './../common/utils.js'
const state = {
  GlobalLoading: false,
  hideSidebar: false,//是否显示整个appMain
  MainLoading:true,
  loginStatus:false,
  modaltitle: "", //模态窗口名
  loading: false,//加载
  regions: [],//地区
  years:[],//年限
  user: {
    name: ""
  },
  menus: [],
  accountRole:'',//登录账号岗位
  loginUser:'',
};

const getters = {
  GlobalLoading: state => state.GlobalLoading,
  hideSidebar: state => state.hideSidebar,
  MainLoading: state => state.MainLoading,
  loginStatus: state => state.loginStatus,
  loading: state => state.loading,
  regions: state => state.regions,
  menus: state => state.menus,
  accountRole: state => state.accountRole,
  loginUser: state => state.loginUser,
  years:state=>state.years
};

const mutations = {

  Change_Global_Loading(state, boolean) {
    state.GlobalLoading = boolean;
  },
  Toggle_App_Main(state, boolean) {
    state.hideSidebar = boolean;
  },
  Change_Main_Loading(state, boolean){
    state.MainLoading = boolean;
  },
  loginStatus(state,flag){
    if(flag){
      state.loginStatus = true;
    }else {
      state.loginStatus = false;
    }
  },
  showLoading () {
    state.loading = true
  },
  hideLoading () {
    state.loading = false
  },
  currentUser(state, user){
    state.loginUser = user;
    state.user = user;
  },
  menu(state, menus){
    // var arr = [];
    menus.forEach((item, index) => {
      // console.log(index + " // " + item.name + " // " + item.parentId);
      // if (item.parentId == null){arr[index] = item;}
    })
    state.menus = menus;
  },
  login(state, user){
    state.user = user;
    // window.sessionStorage.setItem('user', JSON.stringify(user));
  },
  logout(state){
    // window.sessionStorage.removeItem('user');
    state.user = {name: ""}
  },
  Get_Regions(state, regions){
    state.regions = regions;
    setStore("regionList",regions)
  },
  Get_Years(state, years){
    state.years = years;
    setStore("yearList",years)
  },
};

const actions = {
  toggleAppMain({ commit }, boolean) {
    commit('Toggle_App_Main', boolean);
  },
  /**
   * 获取当前登录状态
   */
  loginStatus({dispatch, commit, state, rootState}){
  axios.get('/login_status', {
    query: ''
  }).then((res) => {
    let status = res.status;
    if(status == "0"){
      commit("loginStatus","alreadyLogin");
    }
    if(status == "61"){
      commit("loginStatus");
    }
  }).catch((error) => {
    console.log(error)
  })
},
  /**
   * 获取当前登录用户
   */
  getCurrentUser({dispatch, commit, state, rootState}){
    axios.get('/user/current-user', {
      query: ''
    }).then((res) => {
      let currentUser = res.data;
      let currentRole = res.data.role
      commit('currentUser', currentUser);
      if(currentRole){setStore('currentRole',currentRole)}
      if(currentUser){
        setStore('currentUser',currentUser)
      }
    }).catch((error) => {
      console.log(error)
    })
  },

  /**
   * 获取菜单
   */
  getMenus({dispatch, commit, state, rootState}){
    axios.get('/user/menus', {
      query: ''
    }).then((res) => {
      commit('menu', res.data);
    }).catch((error) => {
      console.log(error)
    })

  },

  /**
   * 获取地区
   */
  getRegions({dispatch, commit, state, rootState}){
    axios.get('/common/getRegions', {
      query: ''
    }).then((res) => {
      commit('Get_Regions', res.data);
    }).catch((error) => {
      console.log(error)
    })
  },

  /**
   * 获取年限
   */
  getYears({dispatch, commit, state, rootState}){
    axios.get('/common/getYears', {
      query: ''
    }).then((res) => {
      commit('Get_Years', res.data);
    }).catch((error) => {
      console.log(error)
    })
  },
}

export default {
    state,
    actions,
    mutations,
    getters
}
