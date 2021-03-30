import React, { Component } from "react";
import { Form, Input, Icon, Button } from "antd";
import logo from "./images/logo.png";
import "./login.less";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { login } from "../../redux/actions";

const Item = Form.Item;

class Login extends Component {
  /*登陆*/
  login = (e) => {
    // 阻止事件默认行为(不提交表单)
    e.preventDefault();
    // 进行表单所有控件的校验
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { username, password } = values;
        // const result = await reqLogin(username, password);
        this.props.login(username, password);
      } else {
        // 校验失败
        console.log(err);
      }
    });
  };

  /*** 自定义表单的校验规则 */
  validator = (rule, value, callback) => {
    // console.log(rule, value)
    const length = value && value.length;
    const pwdReg = /^[a-zA-Z0-9_]+$/;
    if (!value) {
      // callback 如果不传参代表校验成功，如果传参代表校验失败，并且会提示错误
      callback("必须输入密码");
    } else if (length < 4) {
      callback("密码必须大于 4 位");
    } else if (length > 12) {
      callback("密码必须小于 12 位");
    } else if (!pwdReg.test(value)) {
      callback("密码必须是英文、数组或下划线组成");
    } else {
      callback();
      // 必须调用 callback
    }
  };

  render() {
    // 如果用户已经登陆, 自动跳转到首页
    const user = this.props.user;
    if (user && user._id) {
      return <Redirect to="/home" />;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>React 项目: 后台管理系统</h1>
        </header>
        <section className="login-content">
          <div className={user.errorMsg ? "error-msg show" : "error-msg"}>
            {user.errorMsg}
          </div>
          <h3>用户登陆</h3>
          <Form onSubmit={this.login} className="login-form">
            <Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "必须输入用户名",
                  },
                  { min: 4, message: "用户名必须大于 4 位" },
                  { max: 12, message: "用户名必须小于 12 位" },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: "用户名必须是英文、数组或下划线 组成",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Item>
            <Item>
              {getFieldDecorator("password", {
                rules: [
                  // 自定义表单校验规则
                  { validator: this.validator },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Item>
            <Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Item>
          </Form>
        </section>
      </div>
    );
  }
}
const WarpFrom = Form.create()(Login);
export default connect((state) => ({ user: state.user }), { login })(WarpFrom);
