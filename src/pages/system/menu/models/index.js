import IndexServices from '../services/index';
import { message } from 'antd';
export default {
  namespace: 'MenuPage',
  state: {
    List: [],
    Visible: false,
    SelectList: [],
    MenuParams: {
      pid: 0,
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        if (history.location.pathname === '/system/menu') {
          dispatch({ type: 'getList' });
          dispatch({ type: 'getSelectList' });
        }
      });
    },
  },

  effects: {
    *getList({ payload }, { select, call, put }) {
      yield put({ type: 'LeftMenu/save', payload: { loading: true } });
      const { data } = yield call(IndexServices.getList);
      if (data.status == 200) {
        yield put({ type: 'LeftMenu/save', payload: { loading: false } });
        yield put({ type: 'save', payload: { List: data.data } });
      }
    },
    *getSelectList({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.getSelectList);
      if (data.status == 200) {
        yield put({ type: 'save', payload: { SelectList: data.data } });
      }
    },
    *SaveDate({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.menuAddUser, { params: payload.params });
      if (data.status == 200) {
        console.log(1);
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
