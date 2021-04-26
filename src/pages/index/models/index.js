import  IndexServices from "../services/index"
import {message} from 'antd'
export default {
  namespace: 'index',
  state: {
    List:{}
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(()=>{
        if(history.location.pathname==='/index11'){
          dispatch({type:"getList"})
        }
      })
    },
  },

  effects: {
     *getList({ payload },{select, call, put }){
      yield put({type:'LeftMenu/save',payload:{loading:true}});
      const {data}=yield call(IndexServices.getList);
      if(data.status==200){
        yield put({type:'LeftMenu/save',payload:{loading:false}});
        yield put({type:'save',payload:{List:data.data}});
      }

     },
    *logout({ payload },{select, call, put }){
       const logout=yield call(IndexServices.logout);
       if(logout.data.status===200){
         message.success("注销成功");
         window.sessionStorage.removeItem("token");
         window.sessionStorage.removeItem("name");
        //  router.push("/login");
       }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
