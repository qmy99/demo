import {connect} from "dva"
// import { Button } from 'antd';

function IndexPage1() {
  return (
    <div>
      <h1>未找到此页面</h1>
    </div>
  );
}


IndexPage1.propTypes = {
};

function mapStateToProps(state:any) {
   const { collapsed } = state.LeftMenu;
   return {collapsed};
}
export default connect(mapStateToProps)(IndexPage1);
