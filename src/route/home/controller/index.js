import React, {Component} from 'react';
import "./index.css";
import {
  Collapse,
  Icon,
  Row,
  Col,
  Input,
  Checkbox,
  Radio,
  DatePicker,
  List,
  Button,
  Menu,
  Table,
  Tag,
  Pagination,
  BackTop,
  Popover,
  message,
  Avatar,
  Spin
} from 'antd';
import moment from 'moment';
import $ from 'jquery';
import reqwest from 'reqwest';

import InfiniteScroll from 'react-infinite-scroller';

// import {fetch} from "../../../utils";
// import Config from '../../../configName/index'
import {searchAll, searchTable, searchTab} from "../server";
import {G2, Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util} from "bizcharts";
import DataSet from "@antv/data-set";
import {observer, inject} from 'mobx-react';
import AddBookMark from '../components/addBookMark';
import BookMarkManage from '../components/bookMarkManage';
import Organization from '../components/organization';
import MapModal from '../components/map';
import Relation from '../components/relation';

const Panel = Collapse.Panel;
const Search = Input.Search;
const SubMenu = Menu.SubMenu;
const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';


@inject('store')
@observer
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      keywords: "",    //检索关键字
      checkedList: [], //检索内容
      showFlag: true,  //收缩或者展开
      checkedCaseList: [],  //选中类型
      checkAll: false,   //全选
      checkCaseAll: false, //类型全选
      plainOptions: ["玩具", "家电", "美妆", "珠宝", "运动", "游戏","美食","家具"], //检索类型
      caseOptions: ["美妆", "珠宝", "美食"], //检索类型
      RadioValue: 1,  //采集时间
      timeFlage: false, // 自定义时间显示与否
      startValue: null, //开始时间
      endValue: null, //结束时间
      endOpen: false, //结束时间是否展开
      organizationVal: "", //采集机构
      index: "", //文章下标
      listData: [{          //文章所有值
        address: "杭州0",
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "362526199305193038,We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.15932983456",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        href: "http://ant.design",
        name: "张三0",
        tags: ["Unremovable", "Tag 2", "Tag 3"],
        time: "2018-9-05 15:32:12",
        title: "ant design part 0",
      }, {
        address: "杭州1",
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        href: "http://ant.design",
        name: "张三1",
        tags: ["Unremovable", "Tag 2", "Tag 3"],
        time: "2018-9-05 15:32:12",
        title: "ant design part 1",
      }, {
        address: "杭州2",
        avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
        content: "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
        description: "Ant Design, a design language for background applications, is refined by Ant UED Team.",
        href: "http://ant.design",
        name: "张三2",
        tags: ["Unremovable", "Tag 2", "Tag 3"],
        time: "2018-9-05 15:32:12",
        title: "ant design part 2",
      }],
      data: [{     //添加模块table值
        sort: 1,
        keywords: "偷",
        number: 23,
        weekRank: 2
      }, {
        sort: 2,
        keywords: "骗",
        number: 12,
        weekRank: 4
      }, {
        sort: 3,
        keywords: "砍",
        number: 21,
        weekRank: 2
      }, {
        sort: 4,
        keywords: "砍",
        number: 21,
        weekRank: 2
      }, {
        sort: 5,
        keywords: "砍",
        number: 21,
        weekRank: 2
      }],
      inputVisible: false,
      inputValue: '',
      userName: "",
      Pdata: [],
      loading: false,
      hasMore: true,
    }
  }


  componentDidMount = () => {
    this.checkDom()
    this.getData((res) => {
      this.setState({
        Pdata: res.results,
      });
    });
    this.ss();
    this.zz()
  };
  componentWillUnmount = () => {
    window.onscroll = '';
  }

  async ss() {
    let res = await searchAll();
  }

  async zz() {
    let data = await searchTable();
    console.log(data)
  }

  checkDom = () => {
    let that = this;
    window.onscroll = function () {
      let height = window.pageYOffset;
      if (that.state.showFlag) {
        if (height > 400 && height < 1120) {
          that.refs.selectType.style.position = "fixed";
          that.refs.selectType.style.top = "50px";
          that.refs.selectType.style.zIndex = "30";
        } else {
          that.refs.selectType.style.position = "static";
        }
      } else {
        if (height > 580 && height < 1320) {
          that.refs.selectType.style.position = "fixed";
          that.refs.selectType.style.top = "50px";
          that.refs.selectType.style.zIndex = "30";
        } else {
          that.refs.selectType.style.position = "static";
        }
      }
    };
  };
  /**
   * 检索关键字
   * @param value
   */
  changeKeyWords = (value) => {
    this.setState({
      keywords: value
    })
  }
  /**
   * 检索关键字
   * @param value
   */
  onChangeKeyWords = (e) => {
    this.setState({
      keywords: e.target.value
    })
  }
  /**
   * 展开收缩
   */
  isShow = () => {
    this.setState({
      showFlag: !this.state.showFlag
    })
  };
  /**
   * 添加书签
   */
  addBookMark = (e) => {
    e.stopPropagation()
    this.props.store.changeAddBook()
    let state = this.state
    this.props.store.setSearchVal(state)
  };
  /**
   * 书签管理弹窗显示
   * @param e
   */
  bookMarkManage = (e) => {
    e.stopPropagation()
    this.props.store.changeMarkManage()
  }
  /**
   * 点击全文检索icon
   * @param e
   */
  searchAll = (e) => {
    e.stopPropagation();
  };

  onChangeUserName = (e) => {
    this.setState({userName: e.target.value});
  }
  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }
  handleInfiniteOnLoad = () => {
    let data = this.state.Pdata;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.getData((res) => {
      data = data.concat(res.results);
      this.setState({
        Pdata: data,
        loading: false,
      });
    });
  }

  content = () => {
    return (<div>
        <Input
          placeholder="请输入书签名称"
          prefix={<Icon type="search" theme="outlined" style={{color: 'rgba(0,0,0,.25)'}}/>}
          value={this.state.userName}
          onChange={this.onChangeUserName}
          ref={node => this.userNameInput = node}
        />
        <div className="demo-infinite-container">
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={false}>
            <List dataSource={this.state.Pdata}
                  renderItem={item => (
                    <List.Item key={item.id}>
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                        title={<a href="https://ant.design">{item.name.last}</a>}
                        description={item.email}
                      />
                      <div>Content</div>
                    </List.Item>
                  )}
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin/>
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>

      </div>
    )
  };
  visibleChange = (visible) => {
    if (visible) {
      $("body").on("click", ".ant-popover-content", function (e) {
        e.stopPropagation();
      })
    } else {
      $("body").off("click", ".ant-popover-content", function (e) {
        e.stopPropagation();
      })
    }
  }
  /**
   * 搜索头部
   * @returns {*}
   */
  searchHeader = () => {
    return (<div className="searchHeader">
      <div className="searchHeader_left">
        <span>全文检索</span>
        <Popover content={this.content()} trigger="click" onClick={this.searchAll} onVisibleChange={this.visibleChange}>
          <i className="icon iconfont icon-huatong"></i>
        </Popover>
      </div>
      <div className="searchHeader_right">
        <Icon type="folder-add" theme="outlined" style={{cursor: "pointer"}} onClick={(e) => this.addBookMark(e)}/>
        <span style={{cursor: "pointer"}} onClick={(e) => this.bookMarkManage(e)}><Icon type="book"
                                                                                        theme="outlined"/></span>
      </div>
    </div>)
  }
  /**
   * 列表
   * @returns {*}
   */
  listHeader = () => {
    return (<div className="searchHeader">
      <div className="searchHeader_left">
        <span>检索结果(25)</span>
      </div>
      <div className="searchHeader_right">
        <span><Icon type="close" theme="outlined"/></span>
      </div>
    </div>)
  }
  /**
   * 检索内容多选框
   * @param checkedList
   */
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      checkAll: checkedList.length === this.state.plainOptions.length,
    });
  };
  /**
   * 案件内容多选框
   * @param checkedCaseList
   */
  onChangeCase = (checkedCaseList) => {
    this.setState({
      checkedCaseList,
      checkCaseAll: checkedCaseList.length === this.state.caseOptions.length,
    });
  }
  /**
   * 检索内容全选
   * @param e
   */
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.state.plainOptions : [],
      checkAll: e.target.checked,
    });
  };
  /**
   * 检索类型全选
   * @param e
   */
  onCheckCaseAllChange = (e) => {
    this.setState({
      checkedCaseList: e.target.checked ? this.state.caseOptions : [],
      checkCaseAll: e.target.checked,
    });
  };
  /**
   * 采集单位弹出层
   */
  unitModal = () => {
    this.props.store.changeOrganization();
  };
  /**
   * 采集时间
   * @param e
   */
  onChangeRadio = (e) => {
    this.setState({
      RadioValue: e.target.value,
    }, () => {
      if (e.target.value === 5) {
        this.setState({
          timeFlage: true
        })
      } else {
        this.setState({
          timeFlage: false
        })
      }
    });
  };
  /**
   * 选择从哪个时间开始结束
   * @param dates
   * @param dateStrings
   */
  onChangeTime = (dates, dateStrings) => {
    console.log('From: ', dates[0], ', to: ', dates[1]);
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
  };
  /**
   * 删除标签
   */
  deleteTag = () => {
    console.log(22);
  };
  handleClose = (i, tag, index) => {
    let listData = this.state.listData;
    listData[i].tags.splice(index, 1);
    this.setState({
      listData
    })

  }
  showInput = (i) => {
    this.setState({inputVisible: true, index: i}, () => this.input.focus());
  }
  handleInputChange = (e) => {
    this.setState({inputValue: e.target.value});
  }
  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let listData = state.listData;
    let tags = listData[state.index].tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    listData[state.index].tags = tags;
    this.setState({
      listData,
      inputVisible: false,
      inputValue: '',
    });
  }
  saveInputRef = input => this.input = input;
  renderContent = (item) => {
    let html = "";
    let codeReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/;
    // let res = item.match(codeReg);
    //console.log(res);
  }

  disabledStartDate = (startValue) => {
    const endValue = this.state.endValue;
    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  }

  disabledEndDate = (endValue) => {
    const startValue = this.state.startValue;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  }

  onChangeTime = (field, value) => {
    this.setState({
      [field]: value,
    });
  }

  onStartChange = (value) => {
    this.onChangeTime('startValue', value);
  }
  onEndChange = (value) => {
    this.onChangeTime('endValue', value);
  }

  handleStartOpenChange = (open) => {
    if (!open) {
      this.setState({endOpen: true});
    }
  }

  handleEndOpenChange = (open) => {
    this.setState({endOpen: open});
  }

  render() {
    const {DataView} = DataSet;
    const data1 = [
      {
        item: "Design",
        a: 70,
        b: 30
      },
      {
        item: "Development",
        a: 60,
        b: 70
      },
      {
        item: "Marketing",
        a: 50,
        b: 60
      },
      {
        item: "Users",
        a: 40,
        b: 50
      },
      {
        item: "Test",
        a: 60,
        b: 70
      },
      {
        item: "Language",
        a: 70,
        b: 50
      },
      {
        item: "Technology",
        a: 50,
        b: 40
      },
      {
        item: "Support",
        a: 30,
        b: 40
      },
      {
        item: "Sales",
        a: 60,
        b: 40
      },
      {
        item: "UX",
        a: 50,
        b: 60
      }
    ];
    const dv = new DataView().source(data1);
    dv.transform({
      type: "fold",
      fields: ["a", "b"],
      // 展开字段集
      key: "user",
      // key字段
      value: "score" // value字段
    });
    const cols1 = {
      score: {
        min: 0,
        max: 80
      }
    };
    const IconText = ({type, text}) => (
      <span>
      <Icon type={type} style={{marginRight: 8}}/>
        {text}
      </span>
    );
    const data = [
      {
        year: "1991",
        value: 15468
      },
      {
        year: "1992",
        value: 16100
      },
      {
        year: "1993",
        value: 15900
      },
      {
        year: "1994",
        value: 17409
      },
      {
        year: "1995",
        value: 17000
      },
      {
        year: "1996",
        value: 31056
      },
      {
        year: "1997",
        value: 31982
      },
      {
        year: "1998",
        value: 32040
      },
      {
        year: "1999",
        value: 33233
      }
    ];
    const cols = {
      value: {
        min: 10000
      },
      year: {
        range: [0, 1]
      }
    };
    const columns = [{
      title: '排名',
      dataIndex: 'sort',
      key: 'sort',
    }, {
      title: '搜索关键词',
      dataIndex: 'keywords',
      key: 'keywords',
    }, {
      title: '用户数',
      dataIndex: 'number',
      key: 'number',
    }, {
      title: '周涨辐',
      dataIndex: 'weekRank',
      key: 'weekRank',
    }];
    const data2 = [
      {
        month: "Jan",
        Tokyo: 7.0,
        London: 3.9
      },
      {
        month: "Feb",
        Tokyo: 6.9,
        London: 4.2
      },
      {
        month: "Mar",
        Tokyo: 9.5,
        London: 5.7
      },
      {
        month: "Apr",
        Tokyo: 14.5,
        London: 8.5
      },
      {
        month: "May",
        Tokyo: 18.4,
        London: 11.9
      },
      {
        month: "Jun",
        Tokyo: 21.5,
        London: 15.2
      },
      {
        month: "Jul",
        Tokyo: 25.2,
        London: 17.0
      },
      {
        month: "Aug",
        Tokyo: 26.5,
        London: 16.6
      },
      {
        month: "Sep",
        Tokyo: 23.3,
        London: 14.2
      },
      {
        month: "Oct",
        Tokyo: 18.3,
        London: 10.3
      },
      {
        month: "Nov",
        Tokyo: 13.9,
        London: 6.6
      },
      {
        month: "Dec",
        Tokyo: 9.6,
        London: 4.8
      }
    ];
    const ds = new DataSet();
    const dv2 = ds.createView().source(data2);
    dv2.transform({
      type: "fold",
      fields: ["Tokyo", "London"],
      // 展开字段集
      key: "city",
      // key字段
      value: "temperature" // value字段
    });
    const cols2 = {
      month: {
        range: [0, 1]
      }
    };
    const {startValue, endValue, endOpen} = this.state;

    return (<div>
        <div className="search_select">
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={this.searchHeader()} key="1">
              <div>
                <div className="searchInput">
                  <Search
                    placeholder="请输入检索关键字"
                    enterButton="搜一下"
                    size="large"
                    className="search_input"
                    onSearch={value => this.changeKeyWords(value)}
                    onChange={this.onChangeKeyWords}
                  />
                </div>
                <Row className="retrieve">
                  <Col span={2}><label>检索内容：</label></Col>
                  <Col span={18}>
                    <Checkbox
                      onChange={this.onCheckAllChange}
                      checked={this.state.checkAll}
                    >
                      全部
                    </Checkbox>
                    <CheckboxGroup options={this.state.plainOptions} value={this.state.checkedList}
                                   onChange={this.onChange}/>
                  </Col>
                  <Col span={4}>{this.state.showFlag ?
                    <span className="isShow" onClick={this.isShow}>展开<Icon type="down" theme="outlined"/></span> :
                    <span className="isShow" onClick={this.isShow}>收缩<Icon type="up"
                                                                           theme="outlined"/></span>} </Col>
                </Row>
                <div className={this.state.showFlag ? "active" : ""}>
                  <Row className="caseType">
                    <Col span={2}> <label>检索类型：</label> </Col>
                    <Col span={18}>
                      <Checkbox
                        onChange={this.onCheckCaseAllChange}
                        checked={this.state.checkCaseAll}
                      >
                        全部
                      </Checkbox>
                      <CheckboxGroup options={this.state.caseOptions} value={this.state.checkedCaseList}
                                     onChange={this.onChangeCase}/>
                    </Col>
                  </Row>
                  <Row className="caseType">
                    <Col span={2} style={{lineHeight: "32px"}}> <label>生产单位：</label> </Col>
                    <Col span={9}>
                      <Input disabled defaultValue={this.state.organizationVal}
                             addonAfter={<Icon type="setting" onClick={this.unitModal}/>} placeholder={"请选择生产单位"}/>
                    </Col>
                  </Row>
                  <Row className="caseType">
                    <Col span={2}> <label>生产时间：</label> </Col>
                    <Col span={22}>
                      <RadioGroup onChange={this.onChangeRadio} value={this.state.RadioValue}>
                        <Radio value={1}>近一周</Radio>
                        <Radio value={2}>一个月</Radio>
                        <Radio value={3}>半年</Radio>
                        <Radio value={4}>一年</Radio>
                        <br/> <br/>
                        <Radio value={5}>自定义</Radio>
                        {this.state.timeFlage ?
                          <span>
                          <DatePicker
                            disabledDate={this.disabledStartDate}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={startValue}
                            placeholder="开始时间"
                            onChange={this.onStartChange}
                            onOpenChange={this.handleStartOpenChange}
                          />~
                          <DatePicker
                            disabledDate={this.disabledEndDate}
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            value={endValue}
                            placeholder="结束时间"
                            onChange={this.onEndChange}
                            open={endOpen}
                            onOpenChange={this.handleEndOpenChange}
                          /></span> : null}

                      </RadioGroup>
                    </Col>
                  </Row>
                </div>
              </div>
            </Panel>
          </Collapse>
        </div>
        <div className="list">
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={this.listHeader()} key="1">
              <Row>
                <Col span={20}>

                  <List
                    itemLayout="vertical"
                    size="large"
                    loadMore={<div className="add_more">加载更多...</div>}
                    loading={false}
                    dataSource={this.state.listData}
                    renderItem={(item, i) => (
                      <List.Item
                        key={item.title}
                        actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>,
                          <IconText type="message" text="2"/>]}
                      >
                        <div>
                          <div className="listTitle">{item.title}
                            <span className="listTitleIcon"><a href=""><Icon type="phone" theme="outlined"/></a></span>
                            <span className="listTitleIcon"><a href=""><Icon type="user" theme="outlined"/></a></span>
                          </div>
                          <div className="listTag">
                            {item.tags.map((tag, index) => {
                              const isLongTag = tag.length > 20;
                              const tagElem = (
                                <Tag key={tag} closable={index !== 0}
                                     afterClose={() => this.handleClose(i, tag, index)}>
                                  {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                </Tag>
                              );
                              return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
                            })}
                            {(i === this.state.index && this.state.inputVisible) && (
                              <Input
                                ref={this.saveInputRef}
                                type="text"
                                size="small"
                                style={{width: 78}}
                                value={this.state.inputValue}
                                onChange={this.handleInputChange}
                                onBlur={this.handleInputConfirm}
                                onPressEnter={this.handleInputConfirm}
                              />
                            )}
                            {!this.state.inputVisible && (
                              <Tag
                                onClick={() => this.showInput(i)}
                                style={{background: '#fff', borderStyle: 'dashed'}}
                              > <Icon type="plus"/> 标签
                              </Tag>
                            )}
                          </div>
                          <div className="list_content">
                            {item.content}
                            {this.renderContent(item)}
                          </div>
                          <div className="list_edit">
                            <img className="avter" src={require("../../../static/img/a0.png")} alt=""/>
                            <span className="name">{item.name}</span>
                            <span className="address">{item.address}</span>
                            <span className="time">{item.time}</span>
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </Col>
                <Col span={4}>
                  <div ref="selectType" className="selectType">

                    <Menu
                      defaultSelectedKeys={['1']}
                      defaultOpenKeys={['sub1']}
                      mode="inline"
                      theme="light"
                      inlineCollapsed={this.state.collapsed}
                    >
                      <SubMenu key="sub1"
                               title={<div style={{width: ""}}><Icon type="filter" theme="outlined"/> 筛选</div>}>
                        <Menu.Item key="all">
                          全部(200)
                        </Menu.Item>
                        <Menu.Item key="tell">
                            玩具(140)
                        </Menu.Item>
                        <Menu.Item key="pho">
                            家电(120)
                        </Menu.Item>
                        <Menu.Item key="sms">
                            美妆(160)
                        </Menu.Item>
                        <Menu.Item key="QQ">
                            珠宝(160)
                        </Menu.Item>
                        <Menu.Item key="wx">
                            运动(100)
                        </Menu.Item>
                        <Menu.Item key="email">
                            游戏(100)
                        </Menu.Item>
                        <Menu.Item key="photo">
                          美食(3)
                        </Menu.Item>

                      </SubMenu>

                    </Menu>
                  </div>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </div>
        {this.props.store.loadSearchModal ? <div className="hot_search">
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={<div className="searchHeader">
              <div className="searchHeader_left"><span>热门搜索</span></div>
            </div>} key="1">
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={12}>
                      <div className="hot_search_title">搜索用户数 <Icon type="info-circle" theme="outlined"/></div>
                      <div className="hot_search_count"><span>12323</span> <span>17.2 <Icon type="caret-up"
                                                                                            theme="outlined"/></span>
                      </div>
                      <Chart height={200} data={data} scale={cols} forceFit>
                        <Axis name="year"/>
                        <Axis
                          name="value"
                          label={{
                            formatter: val => {
                              return (val / 10000).toFixed(1) + "k";
                            }
                          }}
                        />
                        <Tooltip
                          crosshairs={{
                            type: "line"
                          }}
                        />
                        <Geom type="area" position="year*value"/>
                        <Geom type="line" position="year*value" size={2}/>
                      </Chart>
                    </Col>
                    <Col span={12}>
                      <div className="hot_search_title">人均搜索次数 <Icon type="info-circle" theme="outlined"/></div>
                      <div className="hot_search_count"><span>2.7</span> <span>2 <Icon type="caret-down"
                                                                                       theme="outlined"/></span></div>
                      <Chart height={200} data={data} scale={cols} forceFit>
                        <Axis name="year"/>
                        <Axis
                          name="value"
                          label={{
                            formatter: val => {
                              return (val / 10000).toFixed(1) + "k";
                            }
                          }}
                        />
                        <Tooltip
                          crosshairs={{
                            type: "line"
                          }}
                        />
                        <Geom type="area" position="year*value"/>
                        <Geom type="line" position="year*value" size={2}/>
                      </Chart>
                    </Col>
                  </Row>
                  <div>
                    <Table
                      columns={columns}
                      dataSource={this.state.data}
                      rowKey={record => record.sort}
                      pagination={false}
                    />
                    <Row className="hot_search_page">
                      <Col span={8}>
                        <div className="left">显示前50个热门关键词</div>
                      </Col>
                      <Col span={16} style={{textAlign: "right"}}>
                        <Pagination defaultCurrent={1} total={50} onChange={value => console.log(value)}/>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col span={12}>
                  <div style={{marginTop: "26px"}} className="hot_search_count"><span>热词:</span> <span>电动车</span></div>
                  <Chart
                    height={600}
                    data={dv}
                    padding={[20, 20, 95, 20]}
                    scale={cols}
                    forceFit
                  >
                    <Coord type="polar" radius={0.8}/>
                    <Axis
                      name="item"
                      line={null}
                      tickLine={null}
                      grid={{
                        lineStyle: {
                          lineDash: null
                        },
                        hideFirstLine: false
                      }}
                    />
                    <Tooltip/>
                    <Axis
                      name="score"
                      line={null}
                      tickLine={null}
                      grid={{
                        type: "polygon",
                        lineStyle: {
                          lineDash: null
                        },
                        alternateColor: "rgba(0, 0, 0, 0.04)"
                      }}
                    />
                    <Legend name="user" marker="circle" offset={30}/>
                    <Geom type="line" position="item*score" color="user" size={2}/>
                    <Geom
                      type="point"
                      position="item*score"
                      color="user"
                      shape="circle"
                      size={4}
                      style={{
                        stroke: "#fff",
                        lineWidth: 1,
                        fillOpacity: 1
                      }}
                    />
                  </Chart>
                </Col>
              </Row>
            </Panel>
          </Collapse>
        </div> : null}
        {this.props.store.loadSearchModal ? <div className="hot_search">
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Panel header={<div className="searchHeader">
              <div className="searchHeader_left"><span>访问统计</span></div>
            </div>} key="1">
              <Chart height={400} data={dv2} scale={cols2} forceFit>
                <Legend/>
                <Axis name="month"/>
                <Axis
                  name="temperature"
                  label={{
                    formatter: val => `${val}°C`
                  }}
                />
                <Tooltip
                  crosshairs={{
                    type: "y"
                  }}
                />
                <Geom
                  type="line"
                  position="month*temperature"
                  size={2}
                  color={"city"}
                />
                <Geom
                  type="point"
                  position="month*temperature"
                  size={4}
                  shape={"circle"}
                  color={"city"}
                  style={{
                    stroke: "#fff",
                    lineWidth: 1
                  }}
                />
              </Chart>
            </Panel>
          </Collapse>
        </div> : null}
        <BackTop/>
        {this.props.store.addBookMarkVisible && <AddBookMark/>}
        {this.props.store.bookMarkManageVisible && <BookMarkManage/>}
        {this.props.store.OrganizationVisible && <Organization/>}
        {/*<MapModal/>*/}
        {/*<Relation/>*/}
      </div>
    )
  }
}

export default Home;
