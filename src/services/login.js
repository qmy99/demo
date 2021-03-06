import request from '../utils/request';
import qs from 'qs';
function login(params) {
  return request(`/WebApi/login`, {
    method: 'post',
    body: qs.stringify({
      username: params.params.username,
      password: params.params.password,
    }),
  });
}

export default {
  login,
};
