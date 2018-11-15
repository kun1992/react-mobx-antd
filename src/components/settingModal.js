import React, {Component} from 'react';
import {Modal, Tabs, Icon, Checkbox, Select, Row, Col, InputNumber, Button} from 'antd';
import {observer, inject} from 'mobx-react';
import '../App.css'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

@inject('store')
@observer
class SettingModal extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  changeTabs = (key) => {
    console.log(key);
  }
  onChangeFristLoad = (e) => {
    console.log(e.target.checked)
  };
  onChangeHide = (e) => {
    // console.log(e.target.checked)
    this.props.store.changeLoad()
  }
  onChangeNumber = (val) => {
    console.log(val);
  }

  render() {

    return (<div>
        <Modal
          visible={this.props.store.settingVisible}
          onOk={this.handleOk}
          onCancel={() => this.props.store.change()}
          footer={null}
        >
          <Tabs onChange={this.changeTabs} type="card">
            <TabPane tab={<div>
              <p><Icon type="setting" theme="outlined"/>常规</p>
            </div>} key="1">
              <div>
                <div>
                  <Checkbox defaultChecked onChange={this.onChangeFristLoad}>首次登录时加载搜索统计模块</Checkbox>
                </div>
                <div className="hideCheckbox">
                  <Checkbox onChange={this.onChangeHide}>隐藏搜索统计模块</Checkbox>
                </div>
                <Row style={{marginTop: "26px"}}>
                  <Col span={4} style={{lineHeight: "32px"}}>默认首页:</Col>
                  <Col span={18}>
                    <Select style={{width: 120}} defaultValue="1">
                      <Option value="1" key="1">全文检索</Option>
                    </Select>
                  </Col>
                </Row>
                <Row style={{margin: "16px 0"}}>
                  <Col span={4} style={{lineHeight: "32px"}}>地图引擎:</Col>
                  <Col span={18}>
                    <Select style={{width: 120}} defaultValue="1">
                      <Option value="1" key="1">高德地图</Option>
                    </Select>
                  </Col>
                </Row>
                <div className="setting_line"></div>
                <div>
                  <div>搜索历史记录</div>
                  <div className="showNumber">显示最近 <InputNumber min={1} max={100} defaultValue={25}
                                                                onChange={this.onChangeNumber}/> 个
                  </div>
                  <div className="deleteHistory"><Button type="default" size="large"><Icon type="delete"
                                                                                           theme="outlined"/> 清空历史记录</Button>
                  </div>
                </div>
              </div>
            </TabPane>


            <TabPane tab={<div>
              <p><Icon type="info-circle" theme="outlined"/>关于应用</p>
            </div>} key="2">
              <Row className="about">
                <Col span={3}><img src={require("../static/img/logo.png")} width="35"/></Col>
                <Col span={20}>
                  <div className="about_content">
                    <p>全息检索引擎</p>
                    <p>版本 1.0.0</p>
                  </div>
                  <div className="about_content">
                    <p>有效期至：2088-08-01</p>
                  </div>
                  <div style={{marginBottom: "16px"}}>包含功能模块:</div>
                  <Row>
                    <Col span={6}>
                      <p style={{textAlign: "center"}}>
                        <i style={{fontSize: "25px"}} className="icon iconfont icon-huatong"/></p>
                      <p style={{textAlign: "center", color: "#9B9B9B"}}>语义检索</p></Col>
                    <Col span={6}>
                      <p style={{textAlign: "center"}}>
                        <i style={{fontSize: "25px"}} className="icon iconfont icon-t-copy"/></p>
                      <p style={{textAlign: "center", color: "#9B9B9B"}}>全文检索</p></Col>
                    <Col span={6}>
                      <p style={{textAlign: "center"}}>
                        <i style={{fontSize: "25px"}} className="icon iconfont icon-biaoqian"/></p>
                      <p style={{textAlign: "center", color: "#9B9B9B"}}>标签检索</p>
                    </Col>
                    <Col span={6}>
                      <p style={{textAlign: "center"}}>
                        <i style={{fontSize: "25px"}} className="icon iconfont icon-guanxitu"/></p>
                      <p style={{textAlign: "center", color: "#9B9B9B"}}>关系检索</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="about_footer">2018@ kun1992</div>
            </TabPane>
          </Tabs>
        </Modal>
      </div>
    )
  }

}

export default SettingModal;
