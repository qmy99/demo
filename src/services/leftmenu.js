import request from '../utils/request';
//import qs from "qs"
function getList() {
  return request(`/WebApi/menu/getlist`);
}
export default {
  getList,
};
