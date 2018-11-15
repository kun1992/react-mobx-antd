import React, {Component} from 'react';
import {Modal, Row, Col, Radio} from 'antd';
import {Map, Marker, InfoWindow} from 'react-amap';

const ZoomCtrl = (props) => {
  const map = props.__map__;
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  const style = {
    position: 'absolute',
    background: '#fff',
    padding: '10px'
  }
  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();
  const zoomCenter = () => {
    let markerPosition = [119.723736, 30.289238];
    map.panTo(markerPosition);
  }

  return (<div style={style}>
    <Radio.Group>
      <Radio.Button onClick={zoomIn}> <i className="icon iconfont icon-fangda"></i></Radio.Button>
      <Radio.Button onClick={zoomOut}><i className="icon iconfont icon-suoxiao"></i></Radio.Button>
      <Radio.Button onClick={zoomCenter}> <i className="icon iconfont icon-centerfocusstrong"></i></Radio.Button>
    </Radio.Group>
  </div>);
};

class MapModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.amapEvents = {
      created: (mapInstance) => {
        console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
        console.log(mapInstance.getZoom());
      }
    };
    this.markerEvents = {
      created: (markerInstance) => {
        console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
        console.log(markerInstance.getPosition());
      },
      click: () => {
        console.log(22)
        this.setState({
          visible: !this.state.visible
        })
      }
    }
    this.markerPosition = {longitude: 120, latitude: 30};
  }

  setMapHeader = () => {
    return (<div>
      <Row>
        <Col span={2}>地图</Col>
        <Col span={19}></Col>
        <Col span={3} style={{textAlign: "center"}}>
          <i style={{cursor: "pointer"}} title="全屏" className="icon iconfont icon-fullscreen"></i></Col>
      </Row>
    </div>)
  }


  handleOk = (e) => {
    console.log(e);

  }

  handleCancel = (e) => {
    console.log(e);

  }

  render() {
    const html4 = `<div style="background: #fff;padding: 0px 5px;border-radius: 5px;"><h3>Window 4</h3><p>This is a window</p><p>Changing Value:</p></div>`;
    return (<div className="map_conent">
      <Modal
        title={this.setMapHeader()}
        visible={false}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        className="map"
        width="1000px"
      >
        <div style={{height: "670px"}}>
          <Map events={this.amapEvents} plugins={['ToolBar']}>
            <ZoomCtrl/>
            <Marker useCluster position={this.markerPosition} events={this.markerEvents}/>
            <InfoWindow
              position={this.markerPosition}
              visible={this.state.visible}
              isCustom={true}
              content={html4}
            >
            </InfoWindow>
          </Map>
        </div>
      </Modal>
    </div>)
  }
}

export default MapModal
