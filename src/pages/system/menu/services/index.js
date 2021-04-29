import request from '../../../../utils/request';
import qs from 'qs';
import utils from '../../../../utils/utils';

function getList() {
  // sessionStorage.getItem('userame')
  return request(`/WebApi/menu/getlist`);
}

function getSelectList() {
  return request(`/WebApi/menu/Select/list`);
}

function menuAddUser({ params }) {
  return request(`/WebApi/menu/addUser?${utils.encode(params)}`);
}

function update({ params, id }) {
  return request(`/WebApi/menu/update/${id}?${utils.encode(params)}`);
}

function delRow({ id }) {
  return request(`/WebApi/menu/delete/${id} `);
}
export default {
  getList,
  getSelectList,
  menuAddUser,
  update,
  delRow,
};
