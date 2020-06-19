import Vue from "vue";
import Vuex from "vuex";
import mobile from "./mobile"
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    isShowStep:false
  },
  modules: {
    mobile
  },
});
