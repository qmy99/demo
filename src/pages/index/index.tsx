import {connect} from "dva"
// import { Button } from 'antd';

function IndexPage() {
  return (
    <div>
      <h1>首页</h1>
    </div>
  );
}

IndexPage.propTypes = {
  // WebApi
};

function mapStateToProps(state:any) {
   const { collapsed } = state.LeftMenu;
   return {collapsed};
}
export default connect(mapStateToProps)(IndexPage);
