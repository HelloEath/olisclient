import axios from "axios";
import * as ajax from "../common/ajax";

const state = {
  deviceList: {},
  deviceDetail: {}
};

const getters = {
  deviceList: state => state.deviceList,
  deviceDetail: state => state.deviceDetail
};

const mutations = {
  Get_device_List(state, deviceList){
    state.deviceList = Object.assign({}, deviceList);
    if (deviceList) {
      state.deviceList = deviceList;
      deviceList.content.forEach(device => {
        device.devicePermission === 1 ?
          device.showPermission = '未授权' :
          device.showPermission = '已授权';

        device.deviceType === '01' ?
          device.showDeviceType = '电脑' :
          device.showDeviceType = '平板';
      });
    } else {
      return;
    }
  },
  Get_device_Detail(state, deviceDetail) {
    state.deviceDetail = Object.assign({}, deviceDetail);
  }
};

const actions = {
  /**
   * 通过api访问服务端，获取设备集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getDeviceList({commit}, params) {
    axios.get("device/devices", {params}).then(res => {
      if(res.code === "0") commit("Get_device_List", res.data);
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
  getDeviceDetail({commit}, devicePermission) {
    axios.get(`device/devicePermission/${devicePermission}`).then(res => {
      if(res.code === "0") commit("Get_device_Detail", res.data);
    })
  },

  /**
   * 通过api访问服务端，保存设备信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  savedeviceDetail({commit}, params) {
    return axios.post("device/device", params);
  },


  /**
   * 通过api访问服务端，根据id删除指定设备信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  deleteDevice({commit}, id) {
    return axios.delete(`device/${id}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
