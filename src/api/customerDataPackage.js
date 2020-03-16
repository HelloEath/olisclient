import axios from "axios"

/**
 * 保存菜单
 * @param params
 */
export function saveCustomerDataPackage(params) {
  return axios.post('/customerDataPackage/createDataPackage', params);
}

/**
 * 删除菜单
 * @param params
 */
export function deleteCustomerDataPackage(id) {
  return axios.delete(`/customerDataPackage/createDataPackage/${id}`);
}
