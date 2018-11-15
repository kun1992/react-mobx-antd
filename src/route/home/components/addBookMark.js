import React, {Component} from 'react';
import {Modal, Input, Row, Col, Radio, message} from 'antd';
import {observer, inject} from 'mobx-react';
import '../controller/index.css'

const RadioGroup = Radio.Group;

@inject('store')
@observer
class AddBookMark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: "",
      colorStatus: 1,
    }
  }

  changeVal = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  };
  changeColor = (e) => {
    this.setState({
      colorStatus: e.target.value
    })
  }
  checkVal = () => {
    if (!this.state.inputValue) {
      message.error("名称必填");
      return
    }
  }
  handleCancel = () => {
    this.props.store.changeAddBook()
  };
  handleOk = () => {
    // this.setState({
    //   inputValue: "",
    //   colorStatus: 1,
    // })
    console.log(Array.prototype.slice.call(this.props.store.searchVal.checkedList),2);
    this.props.store.changeAddBook();
  };

  render() {
    return (<Modal
      title="添加书签"
      visible={this.props.store.addBookMarkVisible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      <div>
        <Row>
          <Col span={3} className="labelClass"><label htmlFor="name">名称 :</label></Col>
          <Col span={21} className="labelClass"><Input defaultValue={this.state.inputValue} onChange={this.changeVal} onBlur={this.checkVal}
                                                       placeholder="请输入书签名称" id="name"/></Col>
        </Row>
        <Row style={{marginTop: "20px"}}>
          <Col span={3} className="labelClass"><label htmlFor="name">标注 :</label></Col>
          <Col span={21} className="labelClass">
            <RadioGroup name="radiogroup" defaultValue={this.state.colorStatus} onChange={this.changeColor}>
              <Radio value={1}><span className="gray"></span></Radio>
              <Radio value={2}><span className="red"></span></Radio>
              <Radio value={3}><span className="blue"></span></Radio>
              <Radio value={4}><span className="green"></span></Radio>
              <Radio value={5}><span className="yellow"></span></Radio>
            </RadioGroup>
          </Col>
        </Row>
      </div>

    </Modal>)
  }
}

export default AddBookMark;
