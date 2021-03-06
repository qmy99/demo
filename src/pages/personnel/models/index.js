import IndexServices from '../services/index';
import { message } from 'antd';
export default {
  namespace: 'personnel',
  state: {
    params: {
      education: '-1',
      sex: '-1',
      workStatus: '-1',
      currentPage: 1,
      perPageRows: 20,
    },
    DataList: {},
    Visible: false,
    ShowVisible: false,
    AddParams: {
      education: '100',
      sex: '1',
      name: '',
      age: '',
      workStatus: '',
      school: '',
      education: '',
      specialty: '',
      Email: '',
      cover: '',
      selfEvaluation: '',
      phone: '',
      id: '',
    },
    Update: false,
    UpdateParams: false,
    UpDateAdd: false,
    SendEmail: {},
    MajorList: [],
    PositionList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        if (history.location.pathname === '/personnel') {
          dispatch({ type: 'getList' });
          dispatch({ type: 'getMajor' });
          dispatch({ type: 'getlistAll' });
        }
      });
    },
  },

  effects: {
    *cancel({ payload }, { select, call, put }) {
      const AddParams = {
        education: '100',
        sex: '1',
        name: '',
        age: '',
        workStatus: '',
        school: '',
        education: '',
        specialty: '',
        Email: '',
        cover: '',
        selfEvaluation: '',
        phone: '',
        id: '',
      };
      yield put({ type: 'save', payload: { AddParams } });
    },
    *getList({ payload }, { select, call, put }) {
      yield put({ type: 'LeftMenu/save', payload: { loading: true } });
      let state = yield select((state) => state.personnel);
      const { data } = yield call(IndexServices.getList, { params: state.params });
      if (data.status == 200) {
        yield put({ type: 'LeftMenu/save', payload: { loading: false } });
        yield put({ type: 'save', payload: { DataList: data.data } });
      }
    },
    *Info({ payload }, { select, call, put }) {
      yield put({ type: 'LeftMenu/save', payload: { loading: true } });
      const { data } = yield call(IndexServices.getInfo, { id: payload.id });
      if (data.status == 200) {
        yield put({ type: 'save', payload: { AddParams: data.data } });
        yield put({ type: 'save', payload: { Visible: true, UpDateAdd: true } });
        yield put({ type: 'LeftMenu/save', payload: { loading: false } });
      }
    },
    *UpDate({ payload }, { select, call, put }) {
      if (payload.id) {
        const { data } = yield call(IndexServices.Update, { params: payload.params, id: payload.id });
        if (data.status == 200) {
          message.success('????????????');
          yield put({ type: 'cancel' });
          yield put({ type: 'save', payload: { Visible: false, UpDateAdd: true } });
          yield put({ type: 'getList' });
        }
      } else {
        const { data } = yield call(IndexServices.addUser, { params: payload.params });
        if (data.status == 200) {
          message.success('????????????');
          yield put({ type: 'cancel' });
          yield put({ type: 'save', payload: { Visible: false, UpDateAdd: true } });
          yield put({ type: 'getList' });
        }
      }
    },
    *Delete({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.deleteUser, { id: payload.id });
      if (data.status == 200) {
        message.success('????????????');
        yield put({ type: 'getList' });
      }
    },
    *SendMessage({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.SendMessage, { payload: payload });
      if (data.status == 200) {
        message.success('?????????????????????');
        yield put({ type: 'getList' });
        yield put({ type: 'save', payload: { ShowVisible: false, SendEmail: {} } });
      }
    },
    *getMajor({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.getMajor);
      if (data.status == 200) {
        yield put({ type: 'save', payload: { MajorList: data.data } });
      }
    },
    *getlistAll({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.getlistAll);
      if (data.status == 200) {
        yield put({ type: 'save', payload: { PositionList: data.data } });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
