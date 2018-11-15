import React, {Component} from 'react';
import {Modal, Input, Row, Col, Radio, List, Icon} from 'antd';
import {observer, inject} from 'mobx-react';
import '../controller/index.css'

const RadioGroup = Radio.Group;
const Search = Input.Search;
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
  'Los Angeles battles huge wildfires.',
];

@inject('store')
@observer
class BookMarkManage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: "",
      colorStatus: 1,
    }
  }

  changeVal = (value) => {
    this.setState({
      inputValue: value
    })
    console.log(value);
  };
  changeColor = (e) => {
    this.setState({
      colorStatus: e.target.value
    })
  }

  handleCancel = () => {
    this.props.store.changeMarkManage()
  };
  handleOk = () => {

  };

  render() {
    return (<Modal
      title="书签管理"
      visible={this.props.store.bookMarkManageVisible}
      onOk={this.handleOk}
      onCancel={this.handleCancel}
    >
      <div>
        <Row>
          <Col span={24} className="labelClass">
            <Search
              placeholder="请输入书签名称"
              onSearch={value => this.changeVal(value)}
            />
          </Col>
        </Row>
        <Row style={{marginTop: "5px"}}>
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
        <List
          bordered
          dataSource={data}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
          }}
          renderItem={item => (<List.Item>

            <Row style={{width: "100%"}}>
              <Col span={1}> <span className="yellow" style={{marginRight: "10px"}}></span></Col>
              <Col span={19}>
                <span style={{marginRight: "10px"}}>{item}</span>
              </Col>
              <Col span={4} style={{textAlign: "right"}}>
                <span style={{marginRight: "8px", cursor: "pointer"}}><Icon type="search" theme="outlined"/></span>
                <span style={{marginRight: "8px", cursor: "pointer"}}><Icon type="file-text" theme="outlined"/></span>
                <span style={{marginRight: "8px", cursor: "pointer"}}><Icon type="delete" theme="outlined"/></span>
              </Col>
            </Row>

          </List.Item>)}
        />

      </div>

    </Modal>)
  }
}

export default BookMarkManage;
