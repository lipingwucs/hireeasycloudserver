/*
Registered routing components
 */

import React, {Component} from 'react'
import {WingBlank, WhiteSpace, NavBar,InputItem,List,Button,Result} from 'antd-mobile'
import { withRouter } from 'react-router'
import {connect} from 'react-redux'
import { updateUser,lockAccount} from '../../redux/actions'

class SearchResult extends Component { 
    state={
        isBlock:false
    }
    lockAccount=()=>{
        const {userDetail} = this.props
        this.setState({isBlock:true},function () {
            userDetail.isBlock=this.state.isBlock
            console.log(this.state)
            console.log(userDetail)
            this.props.lockAccount(userDetail);
        })
    }
    toMain=()=>{
        this.props.history.replace('/admin')
    }
    render () {
        const {userDetail} = this.props
        const {username,type,post,info,company}=userDetail;
        return (
        <div>
            <NavBar className='sticky-header'>Search Result</NavBar>
            <WingBlank style={{marginBottom:50, marginTop:50}}>
                <Result title={username} message={type}/>
                <List>                                   
                    <WhiteSpace style={{marginTop: 40+ 'px'}}/>
                    <InputItem value={post}>Postion:</InputItem>
                    <WhiteSpace/>          
                    <WhiteSpace/>
                    <InputItem value={company}>Company:</InputItem>
                    <WhiteSpace/>
                    <WhiteSpace/>
                    <InputItem value={info}>Information:</InputItem>
                    <WhiteSpace/>                                                                             
                </List>
                <WhiteSpace/>
                <Button type='warning' onClick={this.lockAccount}> Lock this account</Button>
                <WhiteSpace/>
                <Button type='primary' onClick={this.toMain}>Back to main</Button>
            </WingBlank>
        </div>
        )
  }
}
export default withRouter(connect(
    state=>({userDetail:state.userDetail}),
    {updateUser,lockAccount}
)(SearchResult))
