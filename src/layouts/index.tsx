import React from 'react';
import { connect } from 'dva';
import styles from './index.css';
import { Layout, ConfigProvider, Tabs, Spin, message } from 'antd';
import LeftMenu from '../components/LeftMenu';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import HeaderTop from '../components/Header';
import Login from "../components/login"
const { Header, Sider, Content } = Layout;
function IndexPage({ children, collapsed, route, dispatch, childrens, history, loading}: any) {
    if (history.location.pathname === '/login') {
      return <Login/>
    }
    if(!sessionStorage.getItem('token')||!sessionStorage.getItem('userId')){
      message.error('您当前未登录')
      setTimeout(()=>{
        window.location.href = '/login';
      },500)
    }
  return (
    <div className="home">
      <ConfigProvider locale={zhCN}>
        <Spin spinning={loading} tip="Loading...">
          <Layout>
            <Sider width="180px" collapsed={collapsed} className={styles.sider}>
              <LeftMenu></LeftMenu>
            </Sider>
            <Layout>
              <Header className={styles.header}>
                <HeaderTop></HeaderTop>
              </Header>
              <Content>{children}</Content>
            </Layout>
          </Layout>
        </Spin>
      </ConfigProvider>
    </div>
  );
}

IndexPage.propTypes = {};
function mapStateToProps(state: any) {
  const { collapsed, childrens, loading } = state.LeftMenu;
  return {
    collapsed,
    childrens,
    loading,
  };
}
export default connect(mapStateToProps)(IndexPage);
