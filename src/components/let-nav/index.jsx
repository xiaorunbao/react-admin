import { Icon, Menu } from "antd";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../constants/menu";
import logo from "../../assets/images/logo.png";
import "./index.less";

const { SubMenu } = Menu;
/**
 * 左侧导航组件
 */
class LeftNav extends Component {
  /*在第一次 render()之前执行一次 一般可以在此同步为第一次 render()准备数据 */
  componentWillMount() {
    this.menuNodes = this.getMenus(menuList);
    //  this.menuNodes = this.getMenuNodes2(menuConfig)
  }

  getMenus = (mList) => {
    const path = this.props.location.pathname;
    return mList.reduce((pre, item) => {
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
      return pre;
    }, []);
  };
  1;
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
