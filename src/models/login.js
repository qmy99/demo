import loginServices from '../services/login';
import { message } from 'antd';
// import router from 'umi/router'
export default {
  namespace: 'login',
  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
      message.config({
        // top: 100,
        duration: 2,
        maxCount: 1,
      });
      history.listen(() => {});
    },
  },

  effects: {
    *login({ payload }, { select, call, put }) {
      const login = yield call(loginServices.login, { params: { ...payload } });
      if (login.data.status === 4001) {
        message.error('账号或密码错误');
      } else if (login.data.status === 200) {
        message.success('登录成功');
        window.location.href = '/';
        window.sessionStorage.setItem('token', login.data.token);
        window.sessionStorage.setItem('username', login.data.username);
        window.sessionStorage.setItem('userId', login.data.userId);
      } else {
        message.error(login.data.message);
      }
    },
    *logout({ payload }, { select, call, put }) {
      message.success('注销成功');
      window.sessionStorage.removeItem('token');
      window.sessionStorage.removeItem('name');
      window.location.href = '/login';
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
