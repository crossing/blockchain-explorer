/**
 *    SPDX-License-Identifier: Apache-2.0
 */

import React, { Component } from 'react';
import ChartStats from '../Charts/ChartStats';
import PeersHealth from '../Lists/PeersHealth';
import TimelineStream from '../Lists/TimelineStream';
import OrgPieChart from '../Charts/OrgPieChart';
import {
  Row,
  Col,
  CardTitle,Button
} from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import Card from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import Dialog from "material-ui/Dialog";
import icon from "../../static/images/space.png";
import close from "../../static/images/close.png";
import done from "../../static/images/done.png";

import LinearProgress from '@material-ui/core/LinearProgress';

import $ from  'jquery'
const verify_card = {
  padding: '5px 20px'
}
const verify_block = {
  overflow:'hidden',borderBottom: '1px solid #bebdc1',
paddingBottom: '8px',minHeight: '100px',
marginBottom:'8px',
boxSizing: 'border-box',
minHeight:'160px'
}
const verify_block_second = {minHeight:'280px'}
const verify_block_last = {borderBottom:'none',marginBottom:'0',paddingBottom: '0'}
const verify_block_left = {width:'76%',float: 'left'}
const verify_block_left_three = {woverflow:'hidden'}
const verify_block_right = {width:'24%',float: 'left',borderLeft: '1px solid #bebdc1'}
const verify_block_right_two = {height: '241px'}
const verify_text = {
  fontWeight: 'normal',
  wordBreak: 'break-all',
  lineHeight: '1.4',
  padding: '0 10px',
  background: '#d6eeba'
}
const verify_text_title_ = {paddingLeft:'10px'}
const verify_text_title = {
  padding: '20px 0 10px 0',
  fontWeight: 'normal',
  wordBreak: 'break-all',
  fontSize: '12px'
}
const dialogStyle = {
  fontSize: '12px',
  color: '#666'
}
const verify_title = {
  fontSize: '14px',
  color: '#333',
  fontWeight: 'bold'
}
const verify_title_two = {
  fontSize: '16px',
  marginBottom: '5px'
}
const verify_info = {
  lineHeight: '1.5em',
  marginBottom: '5px'
}
const verify_block_ID = {overflow: 'hidden',marginBottom: '10px'}
const verify_block_id = {
  width: '112px',
  height: '100px',
  background: '#fffecd',
  margin: '0 10px',
  float: 'left',
  padding: '2px 0 0 3px',
  fontSize: '12px'
}
const verify_block_ID_h2 = {
  textAlign: 'center',
  color: '#333',
  fontSize: '20px',
  marginTop: '20px'
}
const verify_block_img = { float: 'left',width: '30px'}

const verify_table_div = {paddingRight: '30px',}
const verify_table = {
  width: '100%',
  fontSize: 0,
  whiteSpace: 'normal',
  border: '1px solid #bebdc1'
}
const  verify_table_th = {
  background: '#dddee0',fontSize: '12px',padding: '10px 0',
  borderBottom: '1px solid #bebdc1',
  // borderRight: '1px solid #bebdc1',
  lineHeight: '30px',
  textAlign: 'center',minWidth: '100px',
  fontWeight: 'bold',display:'inline-block'
}
const  verify_table_td = {
  wordBreak: 'break-all',
  fontSize: '12px',
  padding: '10px',
  textAlign: 'center',
  // borderRight: '1px solid #bebdc1',
  verticalAlign: 'middle',
  color:'#666',
  boxSizing: 'border-box',
  lineHeight: '16px', display:'inline-block',
}
const verify_table_left = { textAlign: 'left'}
const verify_table_td_left = {   width:'100%'}
const verify_td_left = { lineHeight:'52px'}
const verify_table_width1 = { width: '20%', borderRight: '1px solid #bebdc1', display:'inline-block'}
const verify_table_width2 = { width: '80%'}
const verify_hash = { 
  color: '#666',
  fontSize: '12px',
  wordBreak: 'break-all',
  padding: '20px 10px',
  border: '1px solid #bebdc1',fontWeight:'bold',lineHeight:'0.8rem'
}
var i = 0
export class DashboardView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      hasDbError: false,
      dialogAsk: true,
      dialogContent: false,
      verify_display: 'none',//flex
      verify_hash_text: 'block',
      verify_button: 'none',
      verify_progress: 'block',
      verify_text_html: 'first',
      completed: 0,
      verify_block_id: [0,0,0,0],
      result: 'ok',
      hash_block1: 'none',
      hash_block2: 'none',
      hash_block3: 'none',
      hash_left3: 'none',
      hash_left2: 'none',
      hash_full: '',
      hash_string: '',
      hash_result: 0,
      time_shape: '',
      last_block: 0,
      url_data: {}
    };
    this.add = this.add.bind(this)
    this.getProgres = this.getProgres.bind(this)
  }
  add(i){
      var tbox =$(".tbox")
      var tiao =$(".tiao");
      tiao.css("width",i+"%")
      // .html(i+"%");
    }
  getProgres (item) {
    /*add——创建tbx下的div加文字和变宽度的方法*/
    /*创建方法（i++循环起来）*/  
    var time = 100
      if(i>100){
        // $(".ok").html("加载完成").fadeIn("slow");
        if(item === 'first'){
          this.setState({verify_progress: 'none',hash_block1: 'block',}) 
        }
        if(item === 'second'){
          this.setState({verify_progress: 'none',hash_block2: 'block',})
          clearInterval(this.timer)
        }
        if(item === 'three'){
          this.setState({verify_progress: 'none',hash_block3: 'block',verify_button: 'block'})
          time = 30
        }
        return;
      }
      if(i<=100){
        setTimeout(()=>this.getProgres(item),time)
        this.add(i);
        i++;
      }
  }
  componentWillReceiveProps(nextProps) {
    this.setNotifications(this.props.blockList);
  }

  componentWillMount() {
    if (this.props.blockList == undefined || this.props.dashStats == undefined || this.props.peerStatus == undefined || this.props.transactionByOrg == undefined) {
      this.setState({ hasDbError: true });
    }
  }
  GetQueryString (name)  {
    // var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    // var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    // console.log( window.location)
    // console.log( window.location.search)
    // var context = "";
    // if (r != null)
    //   context = r[2];
    // reg = null;
    // r = null;
    // return context == null || context == "" || context == "undefined" ? "" : context;
  
    let str = window.location.href.split('?')[1]
    if(str){
        let str_= decodeURI(str)
        let arr = str_.split('&')
        let obj = {}
        for(let j=0 ;j<arr.length;j++){
          let item = arr[j].split('=')
          obj[item[0]] = item[1]
        }
        this.setState({url_data: obj})
        let obj_  ={
          encrypt_type: obj.encrypt_type,
          stock_proof_number: obj.stock_proof_number,
          buyer: obj.buyer,
          product_varieties: obj.product_varieties,
          product_name: obj.product_name,
          product_amount: obj.product_amount,
          unit: obj.unit,
          warehouse: obj.warehouse,
          salt: obj.salt,
          type: obj.type,
          tx_id: obj.tx_id
        }
        this.getData(obj_)
    }
  }
  progress = () => {
    const { completed } = this.state;
    if (completed === 100) {
      // this.setState({completed: 0});
    } else {
      const diff = Math.random() * 100;
      this.setState({ completed: Math.min(completed + diff, 100) });
    }
  };
  getAmount = () => {
    const result = this.state.last_block
      
    if( this.state.verify_block_id[3] > result){
      this.setState({verify_block_id: [743-3,743-2,743-1,743]})
      clearInterval(this.timer2)
    }else{
      var a =  0
      if( this.state.verify_block_id[3] == 0){
        a = 700
      }else{
        a =  this.state.verify_block_id[3]
      }
      this.setState({verify_block_id: [a,a+1,a+2,a+3]})
     
    }
  };
  
  getContent = () =>{
    this.setState({dialogContent: true,dialogAsk:false,verify_display: 'flex'})
  	
      this.getProgres('first')
    // });
     setTimeout(()=>this.getSecond(), 11000)//数字
     this.GetQueryString()
  }
  getSecond = () => { 
    this.timer = setInterval(()=>this.getAmount(), 100)//数字
    i = 0
    this.setState({hash_left2: 'block',verify_progress:'block',verify_text_html: 'second'})
    this.getProgres('second')
    setTimeout(()=>this.getThree(), 11000)//数字
  }
 
  getThree = () => {
    i = 0
    this.setState({hash_left3: 'block',verify_progress:'block',verify_text_html: 'three'})
    this.getProgres('three')
  }
  getData = (obj)=>{
    $.ajax({
      url:'/api/v1/verify_result/',
      data: obj,
      dataType:'json',
      type:'POST',
      success:function(data){
        var code = ''
        if(data.data.result){
          code = 'ok'
        }else{
          code = 'error'
        }
       
         this.setState({
           hash_full:data.data.fullHash,
           hash_string: data.data.encrypt_string,
           result: code,
           last_block: data.data.latest_block,
           time_shape: data.data.timeshape
          })
      }.bind(this),
      error:function(e){
          console.log(e.toString());
      }.bind(this)
    });
  }
 
  componentWillUnmount() {clearInterval(this.timer);}


  componentDidMount() {
    this.setNotifications(this.props.blockList);
    let str = 'http://www.maidq.com/index.html?ver=1.0&id=6#imhere'
  }

  setNotifications = blockList => {
    let notificationsArr = [];
    if (blockList !== undefined) {
      for (
        let i = 0;
        i < 3 && blockList && blockList[i];
        i++
      ) {
        const block = blockList[i];
        const notify = {
          title: `区块 ${block.blocknum} `,
          type: "block",
          time: block.createdt,
          txcount: block.txcount,
          datahash: block.datahash,
          blockhash: block.blockhash
        };
        notificationsArr.push(notify);
      }
    }
    this.setState({ notifications: notificationsArr });
  };
  handleDialogClose_ask = () => {
    this.setState({dialogAsk: false});
  };
  handleDialogClose_content = () => {
    this.setState({dialogContent: false});
  };
  render() {

    const re_status = {
      error: {
        text:'两组HASH值对比一致，仓单数据错误',
        src: close
      },
      ok: {
        text: '两组HASH值对比一致，仓单数据正确',
        src: done
      }
    }
    const verify_txt = {
      'first': '正在根据仓单信息和SALT值生成HASH...',
      'second': '正在搜索该笔仓单链上的HASH值...',
      'three': '这时候显示的api的数据，对比结果是否一致'
    }
    const {result, verify_text_html,url_data} = this.state
    if (this.state.hasDbError) {
      return (
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1>Error: One or more components failed to render.</h1>
        </div>
      );
    }
    return (
      <div className="background-view">
        <div className="dash-view" >
          <Row>
            <Col sm="12">
              <Card className="stats-block ">
                <div className="statistic vdivide">
                    <Row>
                      <Col sm="4">
                        <Avatar className="stat-avatar avatar-node" >
                          <FontAwesome name="users" />
                        </Avatar>
                      </Col>
                      <Col sm="4">
                        {/* <h1 className="stat-count">{this.props.dashStats.peerCount}</h1> */}
                        <h1 className="stat-count">{this.props.peerStatus.length}</h1>
                      </Col>
                    </Row>
                    节点
                    </div>
                <div className="statistic vdivide">
                  <Row>
                    <Col sm="4">
                      <Avatar className="stat-avatar avatar-block" >
                        <FontAwesome name="cube" />
                      </Avatar>
                    </Col>
                    <Col sm="4">
                      <h1 className="stat-count">{this.props.dashStats.latestBlock}</h1>
                    </Col>
                  </Row>
                  区块
                    </div>
                <div className="statistic vdivide">
                  <Row>
                    <Col sm="4">
                      <Avatar className="stat-avatar avatar-tx" >
                        <FontAwesome name="list-alt" />
                      </Avatar>
                    </Col>
                    <Col sm="4">
                      <h1 className="stat-count">{this.props.dashStats.txCount}</h1>
                    </Col>
                  </Row>
                  交易数
                   </div>
                <div className="statistic">
                  <Row>
                    <Col sm="4">
                      <Avatar className="stat-avatar avatar-chaincode" >
                        <FontAwesome name="handshake-o" />
                      </Avatar>
                    </Col>
                    <Col sm="4">
                      <h1 className="stat-count">{this.props.dashStats.chaincodeCount}</h1>
                    </Col>
                  </Row>
                  链码
                  </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col sm="6" >
              <Card className="dash-section">
                <PeersHealth
                  peerStatus={this.props.peerStatus}
                />
              </Card>
              <Card className="dash-section">
                <TimelineStream notifications={this.state.notifications} blockList={this.props.blockList} />
              </Card>
            </Col>
            <Col sm="6">
              <Card className="dash-section">
                <ChartStats />
              </Card>
              <Card className="dash-section center-column">
                <h5 className="org-header">各用户交易统计</h5>
                <hr />
                <OrgPieChart transactionByOrg={this.props.transactionByOrg} />
              </Card>
            </Col>
          </Row>
        </div>
        <Dialog
          open={this.state.dialogContent}
          onClose={this.handleDialogClose_content}
          fullWidth={true}
          style={dialogStyle}
          maxWidth={'md'}
          disableEscapeKeyDown={true}
          disableBackdropClick={true}
          className="dialog_verify"
        >
          <Card style={verify_card}>
            <CardTitle style={{marginBottom:'5px'}}>
              <span style={verify_title}>第一步：根据货主提供的salt值仓单实时数据生成唯一的HASH值</span>
              <button onClick={this.handleDialogClose_content} className="closeBtn">
                <FontAwesome name="close" />
              </button>
            </CardTitle>
            <div style={verify_block}>
              <div style={verify_block_left}>
                <div style={verify_info}>仓单编号：<span>{url_data.sindentureno || '-'}</span></div>
                <Row>
                  <Col sm="6" >
                    <p style={verify_info}>仓库信息：<span>{url_data.warehouse_info || '-'}</span></p>
                    <p style={verify_info}>仓库名称：<span>{url_data.warehouse || '-'}</span></p>
                    <p style={verify_info}>库位：<span>{url_data.location || '-'}</span></p>
                    <p style={verify_info}>品牌：<span>{url_data.product_brand || '-'}</span></p>
                    <p style={verify_info}>入库重量：<span>{url_data.product_amount || '-'}</span></p>
                  </Col>
                  <Col sm="6">
                    <p style={verify_info}>货主：<span>{url_data.cargo_owner || '-'}</span></p>
                    <p style={verify_info}>品名：<span>{url_data.product_name || '-'}</span></p>
                    <p style={verify_info}>省份：<span>{url_data.provinces || '-'}</span></p>
                    <p style={verify_info}>城市：<span>{url_data.city || '-'}</span></p>
                    <p style={verify_info}>具体位置：<span>{url_data.warehouse_location || '-'}</span></p>
                  </Col>
                </Row>
              </div>
              <div style={verify_block_right}>
                <div style={verify_text}>
                  <div style={{display: this.state.hash_block1}}>
                    <h2 style={verify_text_title}>根据货主提供的salt值仓单实时数据生成唯一的HASH值：</h2>
                    <span>{this.state.hash_string}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{...verify_block,...verify_block_second}}>
            <div style={{display: this.state.hash_left2}}>
              <div style={verify_title_two}>第二步：获取区块链上仓单最后一次更新时的HASH值</div>
              <div style={verify_block_left}>
                <div>
                  <div style={verify_block_ID}>
                    <div style={verify_block_img}>
                      <img src={icon} />
                    </div>
                    <div style={verify_block_id}>
                      <div>Block ID</div>
                      <h2 style={verify_block_ID_h2}>{this.state.verify_block_id[0]}</h2>
                    </div>
                    <div style={verify_block_img}>
                      <img src={icon} />
                    </div>
                    <div style={verify_block_id}>
                      <div>Block ID</div>
                      <h2 style={verify_block_ID_h2}>{this.state.verify_block_id[1]}</h2>
                    </div>
                    <div style={verify_block_img}>
                      <img src={icon} />
                    </div>
                    <div style={verify_block_id}>
                      <div>Block ID</div>
                      <h2 style={verify_block_ID_h2}>{this.state.verify_block_id[2]}</h2>
                    </div>
                    <div style={verify_block_img}>
                      <img src={icon} />
                    </div>
                    <div style={verify_block_id}>
                      <div>Block ID</div>
                      <h2 style={verify_block_ID_h2}>{this.state.verify_block_id[3]}</h2>
                    </div>
                    <div style={verify_block_img}>
                      <img src={icon} />
                    </div>
                  </div>
                </div>
                <div style={verify_table_div}>
                  {/* <table style={verify_table} className="verifyTable">
                    <thead>
                      <tr>
                        <th style={verify_table_th}>时间戳</th>
                        <th style={verify_table_th}>仓单HASH</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={verify_table_td}>12435678</td>
                        <td style={{...verify_table_td,...verify_table_left}}>9d756b595dd43efa5e5a084053f31d66108d2ad0cdd7ffddfa6ed56b7b2c3f0bc952e8745d8fff54c8375ca3fbc614d300d044b92c730a69bc0ec35b0af5e138</td>
                      </tr>
                    </tbody>
                  </table> */}
                  <div style={verify_table}>
                    <div>
                      <div style={{...verify_table_th,...verify_table_width1}}>时间戳</div>
                      <div style={{...verify_table_th,...verify_table_width2}}>仓单HASH</div>
                    </div>
                    <div>
                      <div style={{...verify_table_width1,...verify_td_left}}>
                        <div style={{...verify_table_td,...verify_table_td_left}}>{this.state.time_shape}</div>
                      </div>
                      <div style={{...verify_table_td,...verify_table_left,...verify_table_width2}}>{this.state.hash_full}</div>
                    </div>
                  </div>
                  

                </div>
                
              </div>
              <div style={{...verify_block_right}}>
                <div  style={{display: this.state.hash_block2}}>
                  <div style={{...verify_text,...verify_block_right_two}}>
                    <h2 style={verify_text_title}>获取区块链上仓单最后一次更新时的HASH值：</h2>
                    <span>{this.state.hash_full}</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
            <div style={{...verify_block,...verify_block_last}}>
            <div style={{display:this.state.hash_left3}}>
              <div style={verify_title_two}>第三步：HASH值数据对比结果</div> 
              <div style={{...verify_block_left,...verify_block_left_three}}>
                <div style={{paddingRight: '30px'}}>
                  <div style={{width: '50%',float:'left',boxSizing: 'border-box',paddingRight: '30px'}}>
                    <p style={{color:'#666',fontSize: '12px',marginBottom: '10px',paddingTop: '15px'}}>
                    根据货主提供的salt值仓单实时数据生成唯一的HASH值
                    </p>
                    <div style={verify_hash}>{this.state.hash_string}</div>
                  </div>
                  <div style={{width: '50%',float:'left'}}>
                    <p style={{color:'#666',fontSize: '12px',marginBottom: '10px',paddingTop: '15px'}}>
                    获取区块链上仓单最后一次更新时的HASH值
                    </p>
                    <div style={verify_hash}>{this.state.hash_full}</div>
                  </div>
                </div>
              </div>
              <div style={verify_block_right}>
                <div style={{background:'rgb(255, 254, 205)',display: this.state.hash_block3}}>
                  <h2 style={{...verify_text_title,...verify_text_title_}}>验证结果：</h2>
                  <img src = {re_status[result].src} style={{width:'40px',display:'block',margin:"0 auto"}}/>
                  <h3 style={{marginBottom:'0',padding:'10px 42px',textAlign:'center',fontWeight:'noremal',color:"#333",fontSize:'14px',lineHeight:'1.4'}}>
                    {re_status[result].text}
                  </h3>
                </div>
              </div>
            </div>
            </div>
          </Card>

          <div style={{position:'fixed',zIndex: '1001',alignItems:'center',justifyContent:'center',left:0,right:0,top:0,bottom:0,display: this.state.verify_display}}>
            <div style={{width:'423px',height:'150px',background:'#f2f2f2',border:'1px solid #d3d3d3',borderRadius:'2px',boxShadow:'0 0 16px 0 hsla(0,0%,77%,.5)',padding:'10px'}}>
              <div style={{color:'#333',fontSize:'14px',padding:'5px 0',borderBottom:'1px solid #bebdc1',fontWeight:'bold',textAlign:'center'}}>
                区块链仓单验证
              </div>
              <div style={{color:'#333',fontSize: '14px',padding: '10px 0',marginBottom: '7px',display:this.state.verify_hash_text}}>
                {verify_txt[verify_text_html]}
              </div>
              <div style={{display:this.state.verify_progress}}>
                {/* <div >
                  <LinearProgress variant="determinate" value={this.state.completed} />
                  <br />
                  <LinearProgress color="secondary" variant="determinate" value={this.state.completed} />
                </div> */}
                <div className="box">
                  <div className="ok"></div>
                  <div className="tbox">
                      <div className="tiao">
                      </div>
                  </div>
                </div>
              </div>
              <div style={{marginTop: '20px',textAlign: 'center',display: this.state.verify_button}}>
                <Button variant="contained" color="primary" style={{fontSize: '14px'}} onClick={()=>{this.setState({verify_display: 'none'})}}> 确定 </Button>
              </div>
            </div>
            <div>
            </div>
          </div>
        </Dialog>
        <Dialog
          open={this.state.dialogAsk}
          onClose={this.handleDialogClose_ask}
          fullWidth={true}
          style={dialogStyle}
          maxWidth={'xs'}
          disableEscapeKeyDown={true}
          disableBackdropClick={true}
        >
        <Card>
          
            <div style={{width:'100%',height:'170px',background:'#f2f2f2',borderRadius:'2px',boxShadow:'0 0 16px 0 hsla(0,0%,77%,.5)',padding:'10px'}}>
              <div style={{padding: '5px 10px',marginBottom:'20px',fontSize:'14px'}}>  
              加佳有色链即将启动仓单验证流程，待验证仓单信息及SALT值合并生成HASH后，将与链上该笔仓单对应HASH值进行比对。是否继续？
              </div>
              <div style={{textAlign:'center'}}>
                <Button variant="contained" color="primary" 
                style={{fontSize: '14px',marginRight:'30px'}}
                onClick={this.getContent.bind(this)}
                > 继续 </Button>
                <Button variant="contained" color="normal" style={{fontSize: '14px'}} onClick={()=>{this.setState({dialogAsk:false})}}> 取消 </Button>
              </div>
            </div>
        </Card>
        </Dialog>
      </div>
    );
  }
}

export default DashboardView;
