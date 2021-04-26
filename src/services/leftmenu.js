import request from '../utils/request';
//import qs from "qs"
function getMenuList() {
   return request(`/managerApi/permission/menu/tree?menu=homePage`)
}
function getMenuPermission(code) {
   return request(`/managerApi/permission/object/action?object=${code}`)
}
export default {
  getMenuList,
  getMenuPermission
}
