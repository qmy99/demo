import request from '../../../utils/request';
import qs from 'qs';
import utils from '../../../utils/utils';
function getList({params}) {
  return request(`/WebApi/position/getlist?${utils.encode(params)}`);
} 

function getMajor(){
  return request(`/WebApi/getMajor`);
}

function Update({ params, id }) {
  return request(`/WebApi/position/updateUser/${id}?${utils.encode(params)}`);
}

function addPosition({params}){
  return request(`/WebApi/position/addUser?${utils.encode(params)}`);
}

function deleteUser({ id }) {
  return request(`/WebApi/position/deleteUser/${id}`);
}

export default {
  getList,
  getMajor,
  Update,
  addPosition,
  deleteUser
};
