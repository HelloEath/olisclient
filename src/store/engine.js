import axios from "axios";
import * as ajax from "../common/ajax";

const state = {
  engineTypeList: {},
  engineList:{},
  apiList:{},
  engineDetail: {},
  engineTypeDetail:{}
};

const getters = {
  engineTypeList: state => state.engineTypeList,
  engineList: state => state.engineList,
  engineDetail: state => state.engineDetail,
  engineTypeDetail:state=>state.engineTypeDetail,
  apiList:state=>state.apiList,
};

const mutations = {
  Get_engine_Type_List(state, engineTypeList){
    state.engineTypeList = Object.assign({}, engineTypeList);
  },
  Get_api_List(state,apiList){
    state.apiList =  apiList;

  },
  Get_engine_List(state, engineList){
    state.engineList = Object.assign({}, engineList);
  },
  Get_engine_type_Detail(state, engineTypeDetail){
    state.engineTypeDetail = Object.assign({}, engineTypeDetail);

  }
};

const actions = {
  /**
   * 通过api访问服务端，获取发动机类型集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getEngineTypeList({commit}, params) {
    axios.get("engine/engineTypes", {params}).then(res => {
      if(res.code === "0") commit("Get_engine_Type_List", res.data);
    })
  },


  /**
   * 通过api访问服务端，获取Api集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getApiList({commit}, params) {
    axios.get("SaeDesc/SaeDescs-engineType", {params}).then(res => {
      if(res.code === "0") commit("Get_api_List", res.data);
    })
  },


  /**
   * 通过api访问服务端，获取发动机集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getEngineList({commit}, params) {
    axios.get("engine/engines", {params}).then(res => {
      if(res.code === "0") commit("Get_engine_List", res.data);
    })
  },


  /**
   * 通过api访问服务端，根据年限id获取指定发动机类型列表信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getEngineTypeDetail({commit}, id) {
    axios.get(`engine/engineTypesByYearId/${id}`).then(res => {
      if(res.code === "0") commit("Get_engine_type_Detail", res.data);
    })
  },
  /**
   * 通过api访问服务端，保存发动机类型信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveEngineTypeDetail({commit}, params) {
    return axios.post("engine/engineType", params);
  },

  /**
   * 通过api访问服务端，保存发动机信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveEngineDetail({commit}, params) {
    return axios.post("engine/engine", params);
  },

  /**
   * 通过api访问服务端，保存Sae信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveSaeDetail({commit}, params) {
    return axios.post("SaeDesc/SaeDesc", params);
  },
  /**
   * 通过api访问服务端，根据id删除指定设备信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  deleteEngine({commit}, id) {
    return axios.delete(`engine/engine/${id}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
