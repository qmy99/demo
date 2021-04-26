import React from 'react';
import { Menu,Dropdown } from 'antd';
import { connect } from 'dva';
import styles from './header.css';
import { history } from 'umi';
import {MenuFoldOutlined, MenuUnfoldOutlined, LoginOutlined, DownOutlined, UserOutlined } from '@ant-design/icons';
function Header (state:any) {
 function toggleCollapsed (){
  	state.dispatch({type:"LeftMenu/save",payload:{collapsed:!state.collapsed}})
  }
  const menu = (
	  <Menu className={styles.menuPop}>
	    <Menu.Item key="0" onClick={()=>{
	      history.push("/password/changePassword");
        // state.dispatch({type:"changePwd/save",payload:{openType:true}})
	    }}>
			<UserOutlined /> 
         修改密码 
	    </Menu.Item>
	    <Menu.Divider/>
	    <Menu.Item key="3" onClick={()=>state.dispatch({type:"login/logout"})}>
			<LoginOutlined />
			退出登录</Menu.Item>
	  </Menu>
	);
  return (
    <div className={styles.headerTop}>
	{state.collapsed}
		<div className={styles.collapseBtn} onClick={toggleCollapsed} >
			{state.collapsed ?<MenuUnfoldOutlined/> :<MenuFoldOutlined />}
		</div>
		<div className={styles.right}>
			<Dropdown overlay={menu}>
				<div className={styles.user}>{window.sessionStorage.getItem("username")}&nbsp;&nbsp;
				<DownOutlined/>
				</div>
			</Dropdown>
		</div>
    </div>
  );
};

Header.propTypes = {
};

function mapStateToProps(state:any) {
   const { collapsed } = state.LeftMenu;
   return {collapsed};
}
export default connect(mapStateToProps)(Header);
