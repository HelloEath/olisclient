import {
  commafy
} from "./utils.js";
import {
  setStore,
  getStore
} from './utils.js'
import axios from 'axios';

const vFilter = {

  /*菜单管理-获取父级菜单*/
  getParentName(val) {
    const parent_menu = JSON.parse(getStore("parent_menu"));
    let str = '/';
    if (parent_menu && parent_menu.length) {
      parent_menu.forEach(item => {
        if (item.id == val) {
          str = item.name;
        }
      });
    }
    return str;
  },


}

export default vFilter
