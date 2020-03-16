import { Loading } from "element-ui"
import axios from 'axios'
import { getDataList } from './../common/ajax.js'
import { setStore,getStore,removeStore } from './../common/utils.js'
const state = {
    /**
    * @param material 素材管理的数据
    * */
   imgMaterial:{},
   textMaterial:{},
}

const getters = {
    /**
     * 素材管理集合
     */
    imgMaterial:state => state.imgMaterial,
    textMaterial:state => state.textMaterial
}

const mutations = {
    getImgMaterial(state,imgMaterial){
        state.imgMaterial = imgMaterial || {};
    },
    getTextMaterial(state,textMaterial){
        state.textMaterial = textMaterial || {};
    }
}

const actions = {
    /**
     * 通过api访问服务端，获取图片素材数据
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param params
     */
     getImgMaterial({commit}, params=''){
        commit('Change_Global_Loading', true)
        getDataList('/resources/images',params).then(res=>{
            let data = res.data;
            commit('getImgMaterial',data);
            commit('Change_Global_Loading', false);
            setStore('SetParams',params);
            setStore('NumberOfElements',data.numberOfElements);
        }).catch(function (error) {
            setStore('SetParams','')
            console.log(error);
        });
     },

    /**
     * 通过API访问服务端，获取文本素材数据
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param params
     */
     getTextMaterial({commit}, params){
        commit('Change_Global_Loading', true)
        getDataList('/resources/texts',params).then(res=>{
            let data = res.data;
            commit('getTextMaterial',data);
            commit('Change_Global_Loading', false);
            setStore('SetParams',params);
            setStore('NumberOfElements',data.numberOfElements);
        }).catch(function (error) {
            setStore('SetParams','')
            console.log(error);
        });
     },

    /**
     * 通过API访问服务端，获取视频素材数据
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param params
     */
    getVideoMaterial({commit}, params){
        ajax.get('',{
            query:''
        },(Response) =>{
            commit('getVideoMaterial',Response)
        })
    },

    /**
     * 通过API,上传图片素材
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param obj
     */
    updataPictuer({commit}, obj){
        ajax.post('', obj, (response) => {
        //   commit("updataPictuer", response.data);
        });
    },

    /**
     * 通过API,编辑原有的文字素材
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param obj
     */
    seveTextMaterial({commit}, obj){
        return axios.post('/resources/text', obj);
    },

    /**
     * 通过API,新增文字素材
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param obj
     */
    seveNewTextMaterial({commit}, obj){
        return axios.post('/resources/image', obj);
    },

    /**
     * 通过API,上传视频素材
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param obj
     */
    updataVideor({commit}, obj){
        ajax.post('', obj, (response) => {
        //   commit("updataVideor", response.data);
        });
    },

    /**
     * 通过API,删除文本素材
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param obj
     */
    delImgMaterial({commit}, id){
        return axios.delete('/resources/image/'+id);
    },
    /**
     * 通过API,删除文本素材
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param obj
     */
    delTextMaterial({commit}, id){
        return axios.delete('/resources/text/'+id);
    },
    /**
     * 获取img路径
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param obj
     */
    getImgPath({commit}, code){
        return axios.get('/common/static/'+code);
    },
    /**
     * 获取图片信息
     * @param dispatch
     * @param commit
     * @param state
     * @param rootState
     * @param obj
     */
    getImgMessage({commit}, id){
        return axios.get('/resources/image/'+id);
    },
    /**
     * 下载图片
     * @param dispatch
     * @param commit
     *  @param state
     * @param rootState
     * @param obj
     */
    downloadImg({commit}, id){
        //return axios.get('/resources/image/download/'+id);
        return axios({
            method: 'get',
            url: '/resources/image/download/'+id,
            responseType: 'blob'
        })
    }
}
export default {
    state,
    getters,
    mutations,
    actions
}
