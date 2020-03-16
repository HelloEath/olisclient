import axios from "axios";
import * as ajax from "../common/ajax";

const state = {
  allBrandListByMobile: {},
  carTypeListForMobile:{},
  mobileYearList:{},
  mobileEngineTypeList:{},
  saeListForMobile:{},
  regionListForMobile:{}
};

const getters = {
  allBrandListByMobile: state => state.allBrandListByMobile,
  carTypeListForMobile:state=>state.carTypeListForMobile,
  mobileEngineTypeList:state=>state.mobileEngineTypeList,
  mobileYearList:state=>state.mobileYearList,
  saeListForMobile:state=>state.saeListForMobile,
  regionListForMobile:state=>state.regionListForMobile
};

const mutations = {
  Get_AllBrandList_List(state, allBrandList){
    state.allBrandListByMobile = Object.assign({}, allBrandList);
  },
  Get_CarType_List(state, carTypeListForMobile){
    state.carTypeListForMobile = Object.assign({}, carTypeListForMobile);
  },
  Get_Yeat_List(state, yearList){
    state.mobileYearList = Object.assign({}, yearList);
  },
  Get_EngineType_List(state, engineTypeList){
    state.mobileEngineTypeList = Object.assign({}, engineTypeList);
  },
  Get_sae_List(state,saeListForMobile){
    state.saeListForMobile = Object.assign({}, saeListForMobile);

  },
  Get_Regions(state,regionList){
    state.regionListForMobile=Object.assign({},regionList);
  }
};

const actions = {
  /**
   * 通过api访问服务端，获取品牌集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getAllBrandListByMobile({commit}, params) {
    axios.get("mobile/brands", {params}).then(res => {
      if(res.code === "0") commit("Get_AllBrandList_List", res.data);
    })
  },


  /**
   * 通过api访问服务端，根据品牌id获取子车型列表
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getAllCarTypeListForMobile({commit}, id) {
    axios.get(`mobile/oneCarTypes/${id}`).then(res => {
      if(res.code === "0") commit("Get_CarType_List", res.data);
    })
  },

  /**
   * 通过api访问服务端，根据三级车型id获取年限列表
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getYearListForMobile({commit}, id) {
    axios.get(`mobile/year/${id}`).then(res => {
      if(res.code === "0") commit("Get_Yeat_List", res.data);
    })
  },

  /**
   * 通过api访问服务端，根据年限id获取发动机类型列表
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getEngineTypeListForMobile({commit}, params) {
    axios.get(`mobile/engineType`, {params}).then(res => {
      if(res.code === "0") commit("Get_EngineType_List", res.data);
    })
  },
  /**
   * 通过api访问服务端，根据三级车型id和发动机类型id获取发动机和用油信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getSaeListForMobile({commit}, params){
   return axios.get(`mobile/saeList`, {params})
  },
  /**
   * 通过api访问服务端，获取全部地区列表
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getAllRegionsForMobile({dispatch, commit, state, rootState}){
    axios.get('/mobile/getRegions', {
      query: ''
    }).then((res) => {
      commit('Get_Regions', res.data);
    }).catch((error) => {
      console.log(error)
    })
  },
  /**
   * 通过api访问服务端，验证请求客户端是否合法
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  deviceValidate({commit}, params) {
    return axios.post("mobile/deviceValidate", params);
  },

  /**
   * 通过api访问服务端，保存设备信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  savedeviceDetailByMobile({commit}, params) {
    return axios.post("mobile/device", params);
  },

};

export default {
  state,
  getters,
  mutations,
  actions
}
