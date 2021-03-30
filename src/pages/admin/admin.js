import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { connect } from "react-redux";
import Header from "../../components/header";
import LeftNav from "../../components/left-nav";

import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
// import Bar from "../charts/bar";
// import Line from "../charts/line";
// import Pie from "../charts/pie";
import NotFound from "../not-found/not-found";
// import Order from "../order/order";

const { Footer, Sider, Content } = Layout;

/*后台管理主路由组件 */
class Admin extends Component {
  render() {
    const user = this.props.user;
    if (!user._id) {
      return <Redirect to="/login" />;
    }
    return (
      <Layout style={{ height: "100%" }}>
        <Sider>
          <LeftNav />
        </Sider>
        <Layout>
          <Header>Header</Header>
          <Content style={{ backgroundColor: "white" }}>
            <Switch>
              <Redirect from="/" exact to="/home" />
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/product" component={Product} />
              <Route path="/role" component={Role} />
              <Route path="/user" component={User} />
              {/*    <Route path="/charts/bar" component={Bar} />
              <Route path="/charts/pie" component={Pie} />
              <Route path="/charts/line" component={Line} />
              <Route path="/order" component={Order} />*/}
              <Route component={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: "center", color: "#aaaaaa" }}></Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect((state) => ({ user: state.user }))(Admin);
