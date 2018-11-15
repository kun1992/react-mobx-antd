import React, {Component} from 'react';
import {Layout, Menu, Icon, Dropdown} from 'antd';
import {observer, inject} from 'mobx-react';
import {Link} from 'react-router-dom'

const {Header} = Layout;

@inject('store')
@observer

export default class Head extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: "2"
    }
  }

  componentDidMount() {
    if (window.location.pathname == "/a") {
      this.setState({
        current: "1"
      })
    } else if (window.location.pathname == "/") {
      this.setState({
        current: "2"
      })
    }

  }

  handleClick = (key) => {
    if (key.key == "1") {
      this.setState({
        current: "1"
      })
    } else if (key.key == "2") {
      this.setState({
        current: "2"
      })
    }
  }
  change = () => {
    this.props.store.change();
  };
  userChange = (key) => {
    console.log(key)
    if (key.key === "out") {
       window.location.href = "/login";
      localStorage.setItem("url",window.location.pathname)
    }
  }


  render() {
    const menu = (
      <Menu onClick={(key) => {
        this.userChange(key)
      }}>
        <Menu.Item key="info">
          <span>个人信息</span>
        </Menu.Item>
        <Menu.Item key="set">
          <span>设置</span>
        </Menu.Item>
        <Menu.Item key="out">
          <span>退出</span>
        </Menu.Item>
      </Menu>
    );
    return (
      <Header className="header">
        <div className='header_main'>
          <div className="header_logo">
            <span>FastQuery</span>
          </div>
          <div className="header_center zot">
            <Menu
              onClick={this.handleClick}
              selectedKeys={[this.state.current]}
              mode="horizontal"
            >
              <Menu.Item key="1">
                <Link to={"/a"}><i className="icon iconfont icon-huatong"></i> <span>语义检索</span></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={"/"}><i className="icon iconfont icon-t-copy"></i> <span>全文检索</span></Link>
              </Menu.Item>
              <Menu.Item key="3">
                <i className="icon iconfont icon-biaoqian"></i> <span>标签检索</span>
              </Menu.Item>
              <Menu.Item key="4">
                <i className="icon iconfont icon-guanxitu"></i> <span>关系检索</span>
              </Menu.Item>

            </Menu>
          </div>
          <div className="header_right">
            <Icon type="question-circle" theme="outlined"/>
            <Icon type="setting" theme="outlined" className="header_right_setting" onClick={this.change}/>
            <img className="header_right_img" src={require('./../static/img/a0.png')}/>
            <Dropdown overlay={menu}>
                <span className="header_admin">
                  管理员 <Icon type="down"/>
                </span>
            </Dropdown>
          </div>
        </div>
      </Header>
    )
  }

}
