import request from '../../../utils/request';
import qs from 'qs';
function getList() {
  return request(`/WebApi/statistics/getList`);
}
 
export default {
  getList,
};
