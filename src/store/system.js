import * as ajax from '../common/ajax';
import axios from 'axios'
import { getDataList } from './../common/ajax.js'
import { setStore,getStore,removeStore } from './../common/utils.js'
const state = {
    /**
    * @param system 系统全局变量
    * */
   dataQuantityPrediction: '',//预评估开关变量
}

const getters = {
    dataQuantityPrediction: state => state.dataQuantityPrediction,
}

const mutations = {
  getDataQuantityPrediction(state, dataQuantityPrediction) {
    state.dataQuantityPrediction = dataQuantityPrediction;
  }
}

const actions = {
  /**
   * 获取系统参数数据
   */
  getSystemParams({commit}){
    return new Promise(resolve => {
      ajax.get('common/getSystemParams', {
        query: ''
      }, (res) => {
        let dataQuantityPrediction = res.data[0].paramValue;
        commit("getDataQuantityPrediction", JSON.parse(dataQuantityPrediction));
        resolve(res)
      })
    })
  },

  /**
   * 保存系统参数数据
   */
  saveSystemParams({commit}, params){
    return axios.post('common/system-params', params);
  },

}
export default {
    state,
    getters,
    mutations,
    actions
}
