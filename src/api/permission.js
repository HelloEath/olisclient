import axios from "axios"

/**
 * 保存菜单
 * @param params
 */
export function saveMenu(params) {
  return axios.post('/permission/Permission', params);
}

/**
 * 删除菜单
 * @param params
 */
export function deleteMenu(id) {
  return axios.delete(`/permission/Permission/${id}`);
}
