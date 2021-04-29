import LeftMenu from '../components/menu';
import IndexServices from '../services/leftmenu';
// import menusCode from "../components/menusCode"
export default {
  namespace: 'LeftMenu',
  state: {
    loading: false,
    collapsed: false,
    childrens: [],
    menuList: [],
    permission: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        dispatch({ type: 'getList' });
      });
    },
  },

  effects: {
    *getList({ payload }, { call, put }) {
      const { data } = yield call(IndexServices.getList);
      if (data.status == 200) {
        yield put({ type: 'save', payload: { menuList: data.data } });
      }
    },
    *clickCollapse({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: { collapsed: !this.state.collapsed },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
