import axios from "axios";
import * as ajax from "../common/ajax";
import {setStore} from "../common/utils";

const state = {
  regionList: {},
  RegionDetail: {},
  regionOlisList:{},
  allRegionsList:{}
};

const getters = {
  regionList: state => state.regionList,
  regionOlisList:state=>state.regionOlisList,
  RegionDetail: state => state.RegionDetail,
  allRegionsList:state=>state.allRegionsList
};

const mutations = {
  Get_Region_List(state, regionList){
    state.regionList = Object.assign({}, regionList);
  },
  Get_Region_olis_List(state, regionOlisList){
    state.regionOlisList = regionOlisList;
  },
  Get_Region_Detail(state, RegionDetail) {
    state.RegionDetail = Object.assign({}, RegionDetail);
  },
  Get_Regions(state, regions){
    state.allRegionsList = Object.assign({}, regions);

  },
};

const actions = {
  /**
   * 通过api访问服务端，获取地区集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getRegionList({commit}, params) {
    axios.get("region/regions", {params}).then(res => {
      if(res.code === "0") commit("Get_Region_List", res.data);
    })
  },


  /**
   * 通过api访问服务端，根据id获取指定地区油品信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getRegionOlis({commit}, id) {
    axios.get(`region/olis/${id}`).then(res => {
      if(res.code === "0") commit("Get_Region_olis_List", res.data);
    })
  },

  /**
   * 通过api访问服务端，根据id获取指定地区信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getRegionDetail({commit}, id) {
    axios.get(`region/${id}`).then(res => {
      if(res.code === "0") commit("Get_Region_Detail", res.data);
    })
  },

  /**
   * 通过api访问服务端，保存地区信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveRegionDetail({commit}, params) {
    return axios.post("region/region", params);
  },

  /**
   * 通过api访问服务端，保存地区价格信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveRegionPrizeDetail({
             dispatch,
             commit,
             state,
             rootState
           }, params) {
    return new Promise(resolve => {
      ajax.put('region/regionPrize', params, (res) => {
        resolve(res);
      })
    })
  },
  getAllRegions({dispatch, commit, state, rootState}){
    axios.get('/region/getRegions', {
      query: ''
    }).then((res) => {
      commit('Get_Regions', res.data);
    }).catch((error) => {
      console.log(error)
    })
  },

  /**
   * 通过api访问服务端，根据id删除指定地区信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  deleteRegion({commit}, id) {
    return axios.delete(`region/${id}`);
  },

  /**
   * 通过api访问服务端，根据id删除指定地区信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  deleteRegionOlis({commit}, id) {
    return axios.delete(`region/olis/${id}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
