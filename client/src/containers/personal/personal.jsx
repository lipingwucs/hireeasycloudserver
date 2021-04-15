/*
User personal center routing component
 */

import React from 'react'
import {Result, List, WhiteSpace, Button, Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends React.Component {

  logout = () => {
    
    Modal.alert('Logout', 'Are you sure to log out?', [
      {text: 'Cancle'},
      {
        text: 'Yes',
        onPress: ()=> {

          
          Cookies.remove('userid')
         
          this.props.resetUser()
        }
      }
    ])
  }

  render() {
    const {username, info, avatar, company, post,careerObjective} = this.props.user
    return (
      <div style={{marginBottom:50, marginTop:50}}>
        <Result
          img={<img src={require(`../../assets/images/${avatar}.png`)} style={{width: 50}} alt="avatar"/>}
          title={username}
          message={company}
        />

        <List renderHeader={() => 'Information'}>
          <Item multipleLine>
            {post?<Brief>Position: {post}</Brief>:''} 
            {careerObjective?<Brief>Objective: {careerObjective}</Brief>:''}
            <Brief>Introduction: {info}</Brief>           
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.logout}>Logout</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {resetUser}
)(Personal)