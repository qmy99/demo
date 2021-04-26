import IndexServices from '../services/index';
import { message } from 'antd';
import { CodeSandboxCircleFilled } from '@ant-design/icons';
export default {
  namespace: 'Statistics',
  state: {
    List: {},
    MajorList: [],
    educationList: [
      { key: '100', name: '初中及以下' },
      { key: '101', name: '中专' },
      { key: '102', name: '高中' },
      { key: '103', name: '大专' },
      { key: '104', name: '本科' },
      { key: '105', name: '研究生' },
      { key: '106', name: '博士' },
      { key: '107', name: '其他' },
    ],
    dataList: [],
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        if (history.location.pathname === '/statistics') {
          dispatch({ type: 'getMajor' });
        }
      });
    },
  },

  effects: {
    *getList({ payload }, { select, call, put }) {
      let state = yield select((state) => state.Statistics);
      const { data } = yield call(IndexServices.getList, { key: payload.key });
      if (data.status == 200) {
        let name = '年龄情况统计图';
        data.data.map((item) => {
          if (payload.key == 'education') {
            state.educationList.map((item1) => {
              if (item1.key == item.type) {
                item.type = item1.name;
              }
            });
            name = '学历情况统计图';
          }
          if (payload.key == 'specialty') {
            state.MajorList.map((item1) => {
              if (item1.key == item.type) {
                item.type = item1.name;
              }
            });
            name = '专业情况统计图';
          }
        });
        return { data: data.data.sort(compare('const')), name: name };
      }
    },
    *getMajor({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.getMajor);
      if (data.status == 200) {
        yield put({ type: 'save', payload: { MajorList: data.data } });
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
function compare(property) {
  return function (a, b) {
    var value1 = a[property];
    var value2 = b[property];
    return value2 - value1;
  };
}
