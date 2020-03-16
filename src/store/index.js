import Vue from "vue";
import Vuex from "vuex";
import global from "./global";
import user from "./user";
import system from "./system";
import regionList from "./region";  //我的账户 - 系统参数 - 部门列表
import device from "./device"
import material from "./material"
import year from "./year"
import engine from "./engine"
import brand from "./brand"
import imgBase from "./imgBase"
import olis from "./olis"
import mobile from "./mobile"
Vue.use(Vuex);
export default new Vuex.Store({
  state:{
    isShowStep:false
  },
  modules: {
    global,
    user,
    system,
    regionList,
    device,
    material,
    year,
    engine,
    brand,
    imgBase,
    olis,
    mobile
  },
});
