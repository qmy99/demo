import { connect } from 'dva';
import * as indexBj from '../../assets/bannerBJ.jpg';
function IndexPage() {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <img src={indexBj} style={{ width: '100%' }} alt="" />
      <div style={{ position: 'absolute', top: 60, margin: 'auto', height: '40px', width: '100%', textAlign: 'center', fontSize: '52px', color: '#fff' }}>
        欢迎登陆人才需求信息检索系统
      </div>
    </div>
  );
}

IndexPage.propTypes = {
  // WebApi
};

function mapStateToProps(state: any) {
  const { collapsed } = state.LeftMenu;
  return { collapsed };
}
export default connect(mapStateToProps)(IndexPage);
