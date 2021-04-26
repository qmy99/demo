import LeftMenu from '../components/menu';
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
        dispatch({ type: 'save', payload: { menuList: LeftMenu } });
      });
    },
  },

  effects: {
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
