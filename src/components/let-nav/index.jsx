import { Icon, Menu } from "antd";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../constants/menu";
import logo from "../../assets/images/logo.png";
import memoryUtils from "../../utils/memory-utils";
import "./index.less";

const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
class LeftNav extends Component {
  /*在第一次 render()之前执行一次 一般可以在此同步为第一次 render()准备数据 */
  componentWillMount() {
    this.menuSet = new Set(memoryUtils.user.role.menus || []);
    this.menuNodes = this.getMenus(menuList);
    //  this.menuNodes = this.getMenuNodes2(menuConfig)
  }

  /*判断当前用户是否有看到当前 item 对应菜单项的权限 */
  hasAuth = (item) => {
    const key = item.key;
    const menuSet = this.menuSet;
    /*1. 如果菜单项标识为公开 2. 如果当前用户是 admin 3. 如果菜单项的 key 在用户的 menus 中*/
    if (
      item.isPublic ||
      memoryUtils.user.username === "admin" ||
      menuSet.has(key)
    ) {
      return true;
      // 4. 如果有子节点, 需要判断有没有一个 child 的 key 在 menus 中
    } else if (item.children) {
      return !!item.children.find((child) => menuSet.has(child.key));
    }
  };

  getMenus = (mList) => {
    const path = this.props.location.pathname;
    return mList.reduce((pre, item) => {
      if (this.hasAuth(item)) {
        if (!item.children) {
          pre.push(
            <Menu.Item key={item.key}>
              <Link to={item.key}>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          );
        } else {
          pre.push(
            <SubMenu
              key={item.key}
              title={
                <span>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </span>
              }
            >
              {this.getMenus(item.children)}
            </SubMenu>
          );

          if (item.children.find((cItem) => path.indexOf(cItem.key) === 0)) {
            this.openKey = item.key;
          }
        }
      }
      return pre;
    }, []);
  };

  render() {
    // 得到当前请求路径, 作为选中菜单项的 key
    const selectKey = this.props.location.pathname;
    const openKey = this.openKey;
    return (
      <div className="left-nav">
        <Link to="/home" className="logo-link">
          <img src={logo} alt="logo" />
          <h1>硅谷后台</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          selectedKeys={[selectKey]}
          defaultOpenKeys={[openKey]}
        >
          {this.menuNodes}
        </Menu>
      </div>
    );
  }
}
export default withRouter(LeftNav);
