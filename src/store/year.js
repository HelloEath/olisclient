import axios from "axios";
import * as ajax from "../common/ajax";
import {setStore} from "../common/utils";

const state = {
  yearList: {},
  yearDetail: {},
  allYearList:{}
};

const getters = {
  yearList: state => state.yearList,
  yearDetail: state => state.yearDetail,
  allYearList:state=>state.allYearList
};

const mutations = {
  Get_year_List(state, yearList){
    state.yearList = Object.assign({}, yearList);
    setStore("yearList",yearList);
  },
  Get_year_Detail(state, yearDetail) {
    state.yearDetail = Object.assign({}, yearDetail);
  },
  Get_all_year_List(state,allYearList){
    state.allYearList = Object.assign({}, allYearList);

  }
};

const actions = {
  /**
   * 通过api访问服务端，获取year集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getYearList({commit}, params) {
    axios.get("year/years", {params}).then(res => {
      if(res.code === "0") commit("Get_year_List", res.data);
    })
  },


  /**
   * 通过api访问服务端，获取所有year集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getAllYearList({commit}, params) {
    axios.get("year/allYears", {params}).then(res => {
      if(res.code === "0") commit("Get_all_year_List", res.data);
    })
  },
  /**
   * 通过api访问服务端，根据设备码获取指定设备信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getYearDetail({commit}, yearPermission) {
    axios.get(`year/yearPermission/${yearPermission}`).then(res => {
      if(res.code === "0") commit("Get_year_Detail", res.data);
    })
  },

  /**
   * 通过api访问服务端，保存year信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveYearDetail({commit}, params) {
    return axios.post("year/year", params);
  },


  /**
   * 通过api访问服务端，根据id删除指定设备信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  deleteYear({commit}, id) {
    return axios.delete(`year/${id}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
