import React, {Component} from 'react';
import {Layout} from 'antd';

const {Footer} = Layout;

export default class Feet extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<Footer style={{textAlign: 'center'}}>
      Copyright@ 2018 kun1992
    </Footer>)
  }

}
