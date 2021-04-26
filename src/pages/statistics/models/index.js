import  IndexServices from "../services/index"
import {message} from 'antd'
import { CodeSandboxCircleFilled } from "@ant-design/icons";
export default {
  namespace: 'Statistics',
  state: {
    List:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(()=>{
        if(history.location.pathname==='/statistics'){
          dispatch({type:"getList"})
        }
      })
    },
  },

  effects: {
     *getList({ payload },{select, call, put }){
      // yield put({type:'LeftMenu/save',payload:{loading:true}});
      const {data}=yield call(IndexServices.getList);
      if(data.status==200){
        console.log(data)
        // yield put({type:'LeftMenu/save',payload:{loading:false}});
        // yield put({type:'save',payload:{List:data.data}});
      }
     }, 
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
