import IndexServices from '../services/index';
import { message } from 'antd';
export default {
  namespace: 'position',
  state: {
    params: {
      currentPage: 1,
      perPageRows:20
    },
    DataList: {},
    Visible:false,
    Update:false,
    AddParams:{},
    MajorList:[]
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(() => {
        if (history.location.pathname === '/position') {
          dispatch({ type: 'getList' });
          dispatch({ type: "getMajor"})
        }
      });
    },
  },

  effects: {
    *cancel({ payload }, { select, call, put }) {
      const AddParams= {
        positionName:"",
        requirements:"",
        education:"",
        specialty:'',
        pay:"",
        recruitNum:""
      }
      yield put({ type: 'save', payload: { AddParams } });
    },
    *getList({ payload }, { select, call, put }) {
      yield put({ type: 'LeftMenu/save', payload: { loading: true } }); 
      let state = yield select(state => state.position);
      const { data } = yield call(IndexServices.getList,{params:state.params});
      if (data.status == 200) {
        yield put({ type: 'LeftMenu/save', payload: { loading: false } });
        yield put({ type: 'save', payload: { DataList: data.data } });
      }
    },
    *getMajor({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.getMajor);
      if (data.status == 200) {
        yield put({ type: 'save', payload: { MajorList:data.data }});
      }
    },
    *Delete({ payload }, { select, call, put }) {
      const { data } = yield call(IndexServices.deleteUser,{id:payload.id});
      if (data.status == 200) {
        message.success('删除成功')
        yield put({ type: 'getList'})
      }
    },
    *UpDate({ payload }, { select, call, put }) {
      if(payload.id){
        const { data } = yield call(IndexServices.Update,{params:payload.params,id:payload.id});
        if (data.status == 200) {
          message.success('修改成功')
          yield put({ type: 'cancel'})
          yield put({ type: 'save', payload: { Visible:false,Update:true} });
          yield put({ type: 'getList'})
        }
      }else{
        const { data } = yield call(IndexServices.addPosition,{params:payload.params});
        if (data.status == 200) {
          message.success('新增成功')
          yield put({ type: 'cancel'})
          yield put({ type: 'save', payload: { Visible:false,Update:true} });
          yield put({ type: 'getList'})
        }
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
