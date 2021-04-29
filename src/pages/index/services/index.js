import request from '../../../utils/request';
import qs from 'qs';
function getList() {
  return request(`/WebApi/getList`);
}
export default {
  getList,
};
