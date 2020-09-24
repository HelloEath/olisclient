import axios from "axios";
import * as ajax from "../common/ajax";

const state = {
  brandList: {},
  brandDetail: {},
  oneCarTypeList:{},
  twoCarTypeList:{},
  threeCarTypeList:{},

  allBrandList:{},
  oneCarTypeDetail:{},
  twoCarTypeDetail:{},
  threeCarTypeDetail:{}
};

const getters = {
  brandList: state => state.brandList,
  oneCarTypeList: state => state.oneCarTypeList,
  brandDetail: state => state.brandDetail,
  oneCarTypeDetail:state=>state.oneCarTypeDetail,
  twoCarTypeDetail:state=>state.twoCarTypeDetail,
  twoCarTypeList:state => state.twoCarTypeList,
  threeCarTypeList:state => state.threeCarTypeList,
  allBrandList:state=>state.allBrandList,
  threeCarTypeDetail:state=>state.threeCarTypeDetail
};

const mutations = {
  Get_brand_List(state, brandList){
    state.brandList = Object.assign({}, brandList);
  },
  Get_all_brand_List(state,allBrandList){
    state.allBrandList = Object.assign({}, allBrandList);

  },
  Get_one_car_List(state, oneCarTypeList){
    state.oneCarTypeList = Object.assign({}, oneCarTypeList);
  },
  Get_one_car_Detail(state, oneCarTypeDetail) {
    state.oneCarTypeDetail = Object.assign({}, oneCarTypeDetail);
  },
  Get_two_car_Detail(state, twoCarTypeDetail) {
    state.twoCarTypeDetail = Object.assign({}, twoCarTypeDetail);
  },
  Get_three_car_Detail(state, threeCarTypeDetail) {
    state.threeCarTypeDetail = Object.assign({}, threeCarTypeDetail);
  },
  Get_two_car__List(state, twoCarTypeList) {
    state.twoCarTypeList = Object.assign({}, twoCarTypeList);
  },
  Get_Three_car__List(state, threeCarTypeList) {
    state.threeCarTypeList = Object.assign({}, threeCarTypeList);
  },

};

const actions = {
  /**
   * 通过api访问服务端，获取brand集合(分页)
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getBrandList({commit}, params) {
    axios.get("brand/brands", {params}).then(res => {
      if(res.code === "0") commit("Get_brand_List", res.data);
    })
  },
  /**
   * 通过api访问服务端，获取所有brand集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getAllBrandList({commit}, params) {
    axios.get("brand/allBrands", {params}).then(res => {
      if(res.code === "0") commit("Get_all_brand_List", res.data);
    })
  },

  /**
   * 通过api访问服务端，获取一级车型集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getOneCarList({commit}, params) {
    axios.get("brand/oneCarTypes", {params}).then(res => {
      if(res.code === "0") commit("Get_one_car_List", res.data);
    })
  },


  /**
   * 通过api访问服务端，获取二级车型集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getTwoCarList({commit}, params) {
    axios.get("brand/twoCarTypes", {params}).then(res => {
      if(res.code === "0") commit("Get_two_car__List", res.data);
    })
  },


  /**
   * 通过api访问服务端，获取三级车型集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getThreeCarList({commit}, params) {
    axios.get("brand/threeCarTypes", {params}).then(res => {
      if(res.code === "0") commit("Get_Three_car__List", res.data);
    })
  },
  /**
   * 通过api访问服务端，根据品牌id获取指定一级车型列表信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getOneCarTypeDetail({commit}, id) {
    axios.get(`brand/oneCarTypes/${id}`).then(res => {
      if(res.code === "0") commit("Get_one_car_Detail", res.data);
    })
  },


  /**
   * 通过api访问服务端，根据一级车型id获取指定二级级车型列表信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getTwoCarTypeDetail({commit}, id) {
    axios.get(`brand/twoCarTypes/${id}`).then(res => {
      if(res.code === "0") commit("Get_two_car_Detail", res.data);
    })
  },

  /**
   * 通过api访问服务端，根据二级车型id获取指定三级级车型列表信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getThreeCarTypeDetail({commit}, id) {
    axios.get(`brand/threeCarTypes/${id}`).then(res => {
      if(res.code === "0") commit("Get_three_car_Detail", res.data);
    })
  },


  /**
   * 通过api访问服务端，保存brand信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveBrandDetail({commit}, params) {
    return axios.post("brand/brand", params);
  },


  /**
   * 通过api访问服务端，保存一级车型信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveOneCarTypeDetail({commit}, params) {
    return axios.post("brand/oneCarType", params);
  },

  /**
   * 通过api访问服务端，保存二级车型信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveTwoCarTypeDetail({commit}, params) {
    return axios.post("brand/twoCarType", params);
  },


  /**
   * 通过api访问服务端，保存三级车型信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveThreeCarTypeDetail({commit}, params) {
    return axios.post("brand/threeCarType", params);
  },
  /**
   * 通过api访问服务端，根据id删除指定brand信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  deleteBrand({commit}, id) {
    return axios.delete(`brand/${id}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
