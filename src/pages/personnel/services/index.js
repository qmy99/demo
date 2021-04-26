import request from '../../../utils/request';
import qs from 'qs';
import utils from '../../../utils/utils';

function getList({ params }) {
  return request(`/WebApi/getList?${utils.encode(params)}`);
}

function getInfo({ id }) {
  return request(`/WebApi/getUser/${id}`);
}

function Update({ params, id }) {
  return request(`/WebApi/updateUser/${id}?${utils.encode(params)}`);
}

function addUser({ params }) {
  return request(`/WebApi/addUser?${utils.encode(params)}`);
}

function deleteUser({ id }) {
  return request(`/WebApi/deleteUser/${id}`);
}

function SendMessage({ payload }) {
  return request(`/WebApi/SendMessage?${utils.encode(payload)}`);
}

function getMajor(){
  return request(`/WebApi/getMajor`);
}
function getlistAll(){
  return request(`/WebApi/position/getlistAll`); 
}
export default {
  getList,
  getInfo,
  Update,
  addUser,
  deleteUser,
  SendMessage,
  getMajor,
  getlistAll
};
