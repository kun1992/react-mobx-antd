import React, {Component} from 'react';
import {Modal, Row, Col, Button, Radio, message} from 'antd';
import echarts from 'echarts';

class Relation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      height: 670,
      width: 1000,
      Fheight:670,
      classFlag: true
    }
  }

  componentDidMount() {
    console.log("relation---componentDidMount");
    let that = this;
    // alert(window.innerHeight)
    setTimeout(() => {
      that.charts()
    }, 0)

  }

  /**
   * 弹框头部
   * @returns {*}
   */
  setMapHeader = () => {
    return (<div>
      <Row>
        <Col span={4}>关系图</Col>
        <Col span={17}></Col>
        <Col span={3} style={{textAlign: "center"}}>
          <i style={{cursor: "pointer"}} title="全屏" onClick={() => this.fullScreen()}
             className="icon iconfont icon-fullscreen"/></Col>
      </Row>
    </div>)
  }
  /**
   * 设置底部
   */
  setFooter = () => {
    return (<Row>
      <Col span={12} style={{textAlign: "left"}}>
        <Radio.Group>
          <Radio.Button onClick={() => this.zoomIn()}> <i className="icon iconfont icon-fangda"/></Radio.Button>
          <Radio.Button onClick={() => this.zoomOut()}><i className="icon iconfont icon-suoxiao"/></Radio.Button>
          <Radio.Button onClick={() => this.zoomCenter()}> <i
            className="icon iconfont icon-centerfocusstrong"/></Radio.Button>
        </Radio.Group>
      </Col>
      <Col span={12}><Button>取消</Button> <Button type={"primary"}>确定</Button></Col>
    </Row>)
  };
  /**
   * 全屏
   */
  fullScreen = () => {
    console.log(22);
    this.setState({
      classFlag: !this.state.classFlag
    },()=>{
      if(this.state.classFlag){
        console.log(true,window.innerHeight)
        this.setState({
          Fheight:670
        })
      }else {
        console.log(false)
        this.setState({
          Fheight:window.innerHeight-110
        })
      }
    })
  }
  /**
   * 放大
   */
  zoomIn = () => {
    if (this.state.height === 670) {
      console.log(670);
      this.zoomCenter()
      return
    } else {
      document.getElementsByTagName("canvas")[4].style.width = this.state.width + 10 + "px";
      document.getElementsByTagName("canvas")[4].style.height = this.state.height + 10 + "px";
      document.getElementsByClassName("main")[0].style.padding = `${(670 - this.state.height) / 2 -5}px 0px ${(670 - this.state.height) / 2}px 0px`;
      document.getElementsByClassName("main")[0].childNodes[0].style.width = this.state.width + 10 + "px";
      document.getElementsByClassName("main")[0].childNodes[0].style.height = this.state.height + 10 + "px";

      this.setState({
        width: this.state.width + 10,
        height: this.state.height + 10
      }, () => {
        this.charts();
      });
    }
  };
  /**
   * 缩小
   */
  zoomOut = () => {
    if (this.state.height === 190) {
      console.log(200)

      return
    } else {
      document.getElementsByTagName("canvas")[4].style.width = this.state.width - 10 + "px";
      document.getElementsByTagName("canvas")[4].style.height = this.state.height - 10 + "px";
      document.getElementsByClassName("main")[0].style.padding = `${(670 - this.state.height) / 2 + 5}px 0px ${(670 - this.state.height) / 2}px 0px`;
      document.getElementsByClassName("main")[0].childNodes[0].style.width = this.state.width - 10 + "px";
      document.getElementsByClassName("main")[0].childNodes[0].style.height = this.state.height - 10 + "px";

      this.setState({
        width: this.state.width - 10,
        height: this.state.height - 10
      }, () => {
        this.charts();
      });
    }
    console.log("zoomOut")
  };
  /**
   * 还原
   */
  zoomCenter = () => {
    console.log("zoomCenter")
    document.getElementsByTagName("canvas")[4].style.width = 1000 + "px";
    document.getElementsByTagName("canvas")[4].style.height = 670 + "px";
    document.getElementsByClassName("main")[0].style.padding = `0px`;
    document.getElementsByClassName("main")[0].childNodes[0].style.width = 1000 + "px";
    document.getElementsByClassName("main")[0].childNodes[0].style.height = 670 + "px";

    this.setState({
      width: 1000,
      height: 670
    }, () => {
      this.charts();
    });
  }

  /**
   * 图表
   */
  charts = () => {
    let main = document.getElementsByClassName("main")[0];
    console.log(document.getElementsByTagName("canvas")[4], "canvas");
    let myChart = echarts.init(main);
    let option = {
      tooltip: {
        formatter: function (x) {
          return x.data.des;
        }
      },
      series: [
        {
          type: 'graph',
          layout: 'force',
          symbolSize: 80,
          roam: true,
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          force: {
            repulsion: 2500,
            edgeLength: [10, 50]
          },
          draggable: true,
          itemStyle: {
            normal: {
              color: '#4b565b'
            }
          },
          lineStyle: {
            normal: {
              width: 2,
              color: '#4b565b'
            }
          },
          edgeLabel: {
            normal: {
              show: true,
              formatter: function (x) {
                return x.data.name;
              }
            }
          },
          label: {
            normal: {
              show: true,
              textStyle: {}
            }
          },
          data: [
            {
              name: '侯亮平',
              des: '最高检反贪局侦查处处长，汉东省人民检察院副检察长兼反贪局局长。<br/>经过与腐败违法分子的斗争，最终将一批腐败分子送上了审判台，<br/>正义战胜邪恶，自己也迎来了成长。',
              symbolSize: 100,
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            }, {
              name: '李达康',
              des: '汉东省省委常委，京州市市委书记。是一个正义无私的好官。<br/>但为人过于爱惜自己的羽毛，对待身边的亲人和朋友显得有些无情。',
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            }, {
              name: '祁同伟',
              des: '汉东省公安厅厅长',
              symbolSize: 100
            }, {
              name: '陈岩石',
              des: '离休干部、汉东省检察院前常务副检察长。充满正义，平凡而普通的共 产 党人。<br/>对大老虎赵立春，以各种形式执着举报了十二年。<br/>在这场关系党和国家生死存亡的斗争中，老人家以耄耋高龄，<br/>义无反顾地背起了炸 药包，在反腐胜利前夕因病去世。',
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            }, {
              name: '陆亦可',
              des: '汉东省检察院反贪局一处处长',
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            }, {
              name: '高育良',
              des: '汉东省省委副书记兼政法委书记。年近六十，是一个擅长太极功夫的官场老手。侯亮平、陈海和祁同伟是其学生。',
              symbolSize: 100
            }, {
              name: '沙瑞金',
              des: '汉东省省委书记',
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            }, {
              name: '高小琴',
              des: '山水集团董事长，是一位叱咤于政界和商界的风云人物，处事圆滑、精明干练。'
            }, {
              name: '高小凤'
            }, {
              name: '赵东来',
              des: '汉东省京州市公安局局长，充满正义，整治恶势力，<br/>在与检察部门的合作中从最初的质疑到之后的通力配合。',
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            }, {
              name: '程度',
              des: '汉东省京州市公安局光明区分局局长，因犯错误，被李达康书记和赵东来局长点名要清除公安队伍。<br/>但在高小琴的帮助下，祁同伟调他当上了省公安厅办公室副主任。<br/>尽管程度逃避了所有罪责，上面也有人保他，<br/>但最终还是在反贪局局长侯亮平的缜密侦查下被绳之于法。',
            }, {
              name: '吴惠芬',
              des: '汉东省省委副书记高育良的妻子，汉东大学明史教授。',
              itemStyle: {
                normal: {
                  color: 'red'
                }
              }
            }
          ],
          links: [
            {
              source: '高育良',
              target: '侯亮平',
              name: '师生',
              des: '侯亮平是高育良的得意门生'
            }, {
              source: '高育良',
              target: '祁同伟',
              name: '师生'
            }, {
              source: '赵立春',
              target: '高育良',
              name: "前领导"
            }, {
              source: '赵立春',
              target: '赵瑞龙',
              name: "父子"
            }, {
              source: '赵立春',
              target: '刘新建',
              name: "前部队下属"
            }, {
              source: '李达康',
              target: '赵立春', name: "前任秘书"
            }, {
              source: '祁同伟',
              target: '高小琴',
              name: "情人"
            }, {
              source: '陈岩石',
              target: '陈海',
              name: "父子"
            }, {
              source: '陆亦可',
              target: '陈海',
              name: "属下"
            }, {
              source: '沙瑞金',
              target: '陈岩石',
              name: "故人"
            }, {
              source: '祁同伟',
              target: '陈海',
              name: "师哥"
            }, {
              source: '祁同伟',
              target: '侯亮平',
              name: "师哥"
            }, {
              source: '侯亮平',
              target: '陈海',
              name: "同学，生死朋友"
            }, {
              source: '高育良',
              target: '吴惠芬',
              name: "夫妻"
            }, {
              source: '陈海',
              target: '赵东来',
              name: "朋友"
            }]
        }
      ]
    };
    myChart.setOption(option);
  }

  render() {
    return (
      <Modal
        visible={true}
        width={this.state.classFlag ? "1000px" : null}
        title={this.setMapHeader()}
        footer={this.setFooter()}
        className="relation"
      >
        <div style={{height: this.state.Fheight + "px"}}>
          <div className="main"
               style={{width: this.state.width + "px", height: this.state.height + "px", margin: "0 auto"}}/>
        </div>
      </Modal>
    );
  }
}

export default Relation;
