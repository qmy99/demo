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
    *cancel({ payload }, { select, call, put }) {
      const MenuParams = {
        pid: 0,
        name: '',
        url: '',
        id: '',
      };
      yield put({ type: 'save', payload: { MenuParams } });
    },
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
      delete payload.params.id;
      if (payload.id) {
        const { data } = yield call(IndexServices.update, { params: payload.params, id: payload.id });
        if (data.status == 200) {
          message.success('修改成功');
          yield put({ type: 'getList' });
          yield put({ type: 'save', payload: { Visible: false } });
        }
      } else {
        const { data } = yield call(IndexServices.menuAddUser, { params: payload.params });
        if (data.status == 200) {
          message.success('新建成功');
          yield put({ type: 'getList' });
          yield put({ type: 'save', payload: { Visible: false } });
        }
      }
    },
    *delRow({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.delRow, { id: payload.id });
      if (data.status == 200) {
        message.success('删除成功');
        yield put({ type: 'getList' });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
