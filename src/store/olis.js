import { Loading, Message } from "element-ui"
import * as ajax from "../common/ajax"
import * as utils from "../common/utils"
import { getDataList } from './../common/ajax.js'
import axios from 'axios'
import {setStore, getStore, setCascader} from './../common/utils.js'

const state = {

  olis: {},

}
const getters = {
  olisList: state => state.olis,
};

const mutations = {
  olisList(state, olis) {
    state.olis = olis;
  }
};

const actions = {

  /**
   * 通过api，验证品牌唯一性
   * @param obj
   */
  validateBrandName({
                     dispatch,
                     commit,
                     state,
                     rootState
                   }, params) {
    return ajax.get('validate/uniqueBrandName', params, (res) => {
      commit('validateBrandName', true);
    })
  },

  /**
   * 通过api访问服务端，更新油品价格信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  updateOlisPrize({dispatch,
                          commit,
                          state,
                          rootState
                        }, params) {
    return new Promise(resolve => {
      ajax.put('olis/olis-id', params, (res) => {
        resolve(res);
      })
    })
  },

};

export default {
  state,
  getters,
  actions,
  mutations
}
