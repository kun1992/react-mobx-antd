import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {Provider} from 'mobx-react';
import {LocaleProvider} from 'antd';
import asyncComponent from './components/asyncComponent';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import AppStore  from './store/store';
const store = new AppStore();
const AsyncLogin = asyncComponent(() => import('./route/login/controller/index'));


// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={zhCN}>
      <BrowserRouter basename="/">
        <Switch>
          <Route path="/login" component={AsyncLogin}/>
          <Route path="/" component={App}/>
          <Redirect from="**" to="/"/>
        </Switch>
      </BrowserRouter>
    </LocaleProvider>
  </Provider>, document.getElementById('root'));
// registerServiceWorker();
