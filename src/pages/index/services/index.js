import request from '../../../utils/request';
import qs from 'qs';
function getList() {
  return request(`/WebApi/getList`);
}

function logout() {
  return request(`/managerApi/login/logout`, {
    method: 'post',
  });
}
export default {
  getList,
  logout,
};
