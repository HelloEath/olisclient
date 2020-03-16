import axios from "axios";
import * as ajax from "../common/ajax";

const state = {
  imgBaseList: {},
  imgBaseDetail: {},
  allImgBaseList:{},
  allImgTypeBaseList:{}
};

const getters = {
  imgBaseList: state => state.imgBaseList,
  imgBaseDetail: state => state.imgBaseDetail,
  allImgBaseList:state=>state.allImgBaseList,
  allImgTypeBaseList:state=>state.allImgTypeBaseList,
};

const mutations = {
  Get_imgBase_List(state, imgBaseList){
    state.imgBaseList = Object.assign({}, imgBaseList);
    if (imgBaseList) {
      state.imgBaseList = imgBaseList;
      imgBaseList.content.forEach(imgBase => {
        imgBase.imgMaterial.materialType === 1 ?
          imgBase.imgMaterial.showMaterialType = '发动机图片' :
          imgBase.imgMaterial.showMaterialType = '机油图片';

      });
    } else {
      return;
    }
  },
  Get_all_imgBase_List(state, allImgBaseList) {
    state.allImgBaseList = Object.assign({}, allImgBaseList);
  },
  Get_all_type_imgBase_List(state, allImgTypeBaseList) {
    state.allImgTypeBaseList = Object.assign({}, allImgTypeBaseList);
  }
};

const actions = {
  /**
   * 通过api访问服务端，获取集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getImgBaseList({commit}, params) {
    axios.get("imgBase/imgBases", {params}).then(res => {
      if(res.code === "0") commit("Get_imgBase_List", res.data);
    })
  },


  /**
   * 通过api访问服务端，获取集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getAllImgBaseList({commit}, params) {
    axios.get("imgBase/allImgBases", {params}).then(res => {
      if(res.code === "0") commit("Get_all_imgBase_List", res.data);
    })
  },

  /**
   * 通过api访问服务端，获取所有类型素材集合
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  getAllImgBaseListByType({commit}, params) {
    axios.get("imgBase/imgBases-type", {params}).then(res => {
      if(res.code === "0") commit("Get_all_type_imgBase_List", res.data);
    })
  },

  /**
   * 通过api访问服务端，保存信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  saveImgBaseDetail({commit}, params) {
    return axios.post("imgBase/imgBase", params);
  },


  /**
   * 通过api访问服务端，根据id删除指定信息
   * @param dispatch
   * @param commit
   * @param state
   * @param rootState
   * @param params
   */
  deleteImgBase({commit}, id) {
    return axios.delete(`imgBase/${id}`);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
}
