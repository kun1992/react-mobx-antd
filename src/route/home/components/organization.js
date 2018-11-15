import React, {Component} from 'react';
import {Modal, Input, Table} from 'antd';
import {observer, inject} from 'mobx-react';

const Search = Input.Search;

@inject('store')
@observer
class Organization extends Component {
  constructor(props) {
    super(props)
    this.state = {
      record:{},
      data: [{
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer'],
      }, {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser'],
      }, {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: ['cool', 'teacher'],
      }],
    }
  }

  changeVal = (val) => {
    console.log(val)
  }

  handleOk = (e) => {
    console.log(this.state.record)
  }

  handleCancel = (e) => {
    this.props.store.changeOrganization();
  };


  render() {
    const columns = [{
      title: '单位代码',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="javascript:;">{text}</a>,
    }, {
      title: '单位名称',
      dataIndex: 'age',
      key: 'age',
    }];
    return (
      <Modal
        title="选择单位"
        visible={this.props.store.OrganizationVisible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        className="organization"
      >
        <div>
          <Search
            placeholder="请输入书签名称"
            onSearch={value => this.changeVal(value)}
          />
          <Table
            style={{marginTop: "10px"}}
            bordered={true}
            columns={columns}
            dataSource={this.state.data}
            onRow={(record) => {
              return {
                onClick: (e) => { console.log(e,record); this.setState({record})},       // 点击行
              };
            }}/>
        </div>
      </Modal>
    )
  }
}

export default Organization;
