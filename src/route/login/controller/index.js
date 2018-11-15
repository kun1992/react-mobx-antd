import "./login.css";
import React, {Component} from 'react';
import {Form, Icon, Input, Button, Tabs} from 'antd';
import {observer, inject} from 'mobx-react';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

@inject('store')
@observer

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {

  }

  loginType = (key) => {
    console.log(key);
  }

  // 提交
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if (localStorage.getItem("url")) {
          this.props.history.push(localStorage.getItem("url"));
        } else {
          this.props.history.push("/")
        }
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <div className="login">

        <div className="login_body">
          <Tabs defaultActiveKey="1" onChange={this.loginType}>
            <TabPane tab="账户密码登录" key="1">
              <div className="accountLogin">
                <Form onSubmit={this.handleSubmit}>
                  <FormItem>
                    {getFieldDecorator('userName', {
                      rules: [{required: true, message: '请输入用户名!'}],
                    })(
                      <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                             placeholder="账号"/>
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: [{required: true, message: '请输入密码!'}],
                    })(
                      <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                             type="password" placeholder="密码"/>
                    )}
                  </FormItem>
                  <FormItem>
                    <div className="forgetPwd">忘记密码</div>
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                      登录
                    </Button>
                  </FormItem>
                </Form>
              </div>
            </TabPane>
            <TabPane tab="短信登录" key="2">
              <div className="cellLogin">
                <div>
                  <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder="手机号码"/>
                </div>
                <div>
                  <Input style={{width: 189}} prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                         placeholder="验证码"/>
                  <Button type="primary" className="getYZM">获取验证码</Button>
                </div>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button">
                    登录
                  </Button>
                </div>
              </div>
            </TabPane>
          </Tabs>

        </div>
      </div>
    )
  }
}

const InnerLogin = Form.create()(Login)
export default InnerLogin;
