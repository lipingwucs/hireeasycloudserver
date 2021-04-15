/*
Registered routing components
 */

import React, {Component} from 'react'
import {
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button,NavBar,
  Icon,
  TextareaItem
} from 'antd-mobile'
import {connect} from 'react-redux'

import {reportUser} from '../../redux/actions'



class ReportUser extends Component {
  state = {
    reportTitle:'',
    reportedUserName:'',
    reportReason:'',          
  }  

  // Call when click to register
  reportUser = () => {      
    this.props.reportUser(this.state)    
    this.props.history.replace('/')  
    
  }
  
  // Process input data changes: update the corresponding state
  handleChange = (name, val) => {
    // update status
    this.setState({
      [name]: val  // The attribute name is not name, but the value of the name variable
    })
  }

  render() {  
    return (
      <div>         
        <NavBar icon={<Icon type='left'/>} className='sticky-header'onLeftClick={()=> this.props.history.goBack()}>Report user</NavBar>
        <WingBlank >
          <List>                                   
            <WhiteSpace style={{marginTop: 80+ 'px'}}/>
            <InputItem placeholder='Report Title' onChange={val => {this.handleChange('reportTitle', val)}}>Title:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Reported user name' onChange={val => {this.handleChange('reportedUserName', val)}}>User name:</InputItem>
            <WhiteSpace/>
            <TextareaItem title='Reason:' placeholder='Report reason' rows={5} onChange={val => {this.handleChange('reportReason', val)}}></TextareaItem>               
          </List>
        <Button  style={{top:'260px'}} type='primary' onClick={this.reportUser}>Submit report</Button> 
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({reportDetail: state.reportDetail}),
  {reportUser}
)(ReportUser)