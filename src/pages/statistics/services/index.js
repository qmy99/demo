import request from '../../../utils/request';
import qs from 'qs';
function getList({ key }) {
  return request(`/WebApi/statistics/getList?key=${key}`);
}

function getMajor() {
  return request(`/WebApi/getMajor`);
}

export default {
  getList,
  getMajor,
};
