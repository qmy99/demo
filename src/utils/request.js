fetch = require('dva').fetch;
import Promise from 'es6-promise';
import { message } from 'antd';
// import router from "umi/router"
// import qs from "qs"

window.Promise = window.Promise ? window.Promise : Promise;

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  message.error(response.status + '-出错了，请联系管理员！');
  //	const error = new Error(response.statusText);
  //	error.response = response;
  //	throw error;
  return response;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options = {}) {
  if (options) {
    if (!options.headers) {
      options.headers = {};
    }
    options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    options.headers.Authorization =
      window.sessionStorage.getItem('token') || '';
  }
  options.credentials = 'include';
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      if (data.status === 6001 || data.status === 6003) {
        message.error('登陆超时，请重新登陆！');
        window.location.href = '/login';
        window.sessionStorage.setItem('token', '');
        return {};
      } else if (data.status === 500) {
        message.error('500-出错了，请联系管理员！');
      }
      
      return {
        data,
      };
    })
    .catch((err) => ({
      err,
    }));
}
