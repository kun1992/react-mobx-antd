import axios from 'axios'
import {message} from 'antd';
import qs from 'qs'

export function fetch(options) {
  return new Promise((resolve, reject) => {
    //创建一个axios实例
    const instance = axios.create({
      //设置默认根地址
      baseURL: '/',
      //设置请求超时设置
      timeout: 2000,
      //设置请求时的header
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },

      transformRequest: [data => {
        return qs.stringify(data);
      }],

    });
    instance.interceptors.response.use(function (response) {
      let data = response.data;
      let status = response.status;
      return response
      // if((status===200 || status === 304) && data.code==='SUCCESS' ){
      //     return response;
      // }else if(data.code==='FORBIDDEN' || data.code==='UNAUTHORIZED'){
      //     store.commit(types.LOGOUT);
      //     router.replace({
      //         path: 'bs_login',
      //         query: {redirect: router.currentRoute.fullPath}
      //     })
      //     return Promise.reject(data.remark);
      // }else{
      //     return Promise.reject(data.remark);
      // }

    }, function (err) {
      // console.log(err)
      // 对响应错误做点什么
      if (err && err.response) {
        // console.error(err.response.status)
        switch (err.response.status) {
          case 400:
            err.message = '请求错误(400)';
            break;
          case 401:
            err.message = '未授权，请重新登录(401)';
            break;
          case 403:
            err.message = '拒绝访问(403)';
            break;
          case 404:
            err.message = '请求出错(404)';
            break;
          case 408:
            err.message = '请求超时(408)';
            break;
          case 500:
            err.message = '服务器错误(500)';
            break;
          case 501:
            err.message = '服务未实现(501)';
            break;
          case 502:
            err.message = '网络错误(502)';
            break;
          case 503:
            err.message = '服务不可用(503)';
            break;
          case 504:
            err.message = '网络超时(504)';
            break;
          case 505:
            err.message = 'HTTP版本不受支持(505)';
            break;
          default:
            err.message = `连接出错(${err.response.status})!`;
        }
      } else {
        err.message = '连接服务器失败!'
      }
      return Promise.reject(err.message);
    });
    instance[options.method](options.url, options.params).then(response => {
      if (response.data.code === 200 || response.data.code === 0) {
        resolve(response.data);
      } else {
        // reject(response.data)
        return Promise.reject({data: response.data, url: response.config.url});

      }

    }).catch((error) => {
      // if (error.data.code === 10401 && ((error.url).includes('user/attendExhibition') || (error.url).includes('/exhibition/addCompare'))) {
      //   message.error(error.data.alert);
      //   localStorage.clear() & pubsub.publish('login','hello')
      // } else if((error.url).includes('/user/getAttentionList')||(error.url).includes('/exhibition/getCompareList')||(error.url).includes('/user/getInfo')) {
      //
      // } else if(error.data.code === 10401 && (error.url).includes('/user/logout')){
      //
      //   localStorage.clear() & window.location.reload()
      //
      // } else {
      //   message.error(error.data.alert);
      // }


      // // console.log('--------')
      console.log(error);
      // console.log(error.url)
    })
  })
}
