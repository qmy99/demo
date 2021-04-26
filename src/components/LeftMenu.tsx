import React from 'react';
import { Menu } from 'antd';
import { connect } from 'dva';
import styles from './leftmenu.css'
import { history } from 'umi';
const SubMenu = Menu.SubMenu;

function LeftMenu ({collapsed,menuList,childrens}:any){
  const leftMenuItem = (list:any)=>{
  	return list.map((item:any)=>{
  		if(item.children&&item.children.length>0){
  			let childrenItems=leftMenuItem(item.children);
  			return <SubMenu key={item.code} title={ <span>{item.icon}{item.name}</span>}>{childrenItems}</SubMenu>
  		}else{
  			return <Menu.Item key={item.code} onClick={()=>history.push(item.url)}>{item.icon}{item.name}</Menu.Item>
  		}
    })
 }

  return (
    <div>
    		<div className={styles.logo} style={{"backgroundSize":collapsed?"70px":"200px"}}></div>
    		<div className={styles.menu}>
	      	<Menu className="leftTree"
	      	  selectable={false}
	          defaultSelectedKeys={['1']}
	          mode="inline"
	          theme="dark">
            		{leftMenuItem(menuList)}

	        </Menu>
        </div>
    </div>
  );
}

LeftMenu.propTypes = {
};

function mapStateToProps(state:any) {
   return state.LeftMenu;
}
export default connect(mapStateToProps)(LeftMenu);
