import React, {Component} from 'react';
import './App.css';
import {Layout} from 'antd';
import {Route, Switch} from 'react-router-dom';
import Head from './components/head';
import Feet from './components/foot';
import {observer, inject} from 'mobx-react';
import asyncComponent from './components/asyncComponent';



import SettingModal from './components/settingModal';
const AsyncHome = asyncComponent(() => import('./route/home/controller/index'));
const AsyncA = asyncComponent(() => import('./route/a/controller/index'));


const { Content} = Layout;

@inject('store')
@observer
class App extends Component {

  handleClick = (key) => {
    console.log(key)
  }

  render() {
    return (
      <div className="App">
        <Head/>
        <Layout className="layout">
          <Content style={{padding: '88px 50px 0'}}>
            <div style={{padding: 24, minHeight: 280, width: "1184px", margin: "0 auto", background: "#f0f2f5"}}>
              <Switch>
                <Route path="/" component={AsyncHome} exact/>
                <Route path="/a" component={AsyncA} exact/>
              </Switch>
            </div>
          </Content>
          <Feet/>
        </Layout>
        <SettingModal/>
      </div>
    );
  }
}

export default App;
