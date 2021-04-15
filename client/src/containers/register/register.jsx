/*
Registered routing components
 */

import React, {Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '',  //  username
    password: '',  //  password
    password2: '',  // password2
    type: 'jobSeeker',  // userType   
  }

  // Call when click to register
  register = () => {
    
    this.props.register(this.state)
  }

  // Process input data changes: update the corresponding state
  handleChange = (name, val) => {
    // update status
    this.setState({
      [name]: val  // The attribute name is not name, but the value of the name variable
    })
  }

  toLogin = () => {
    this.props.history.replace('/login')
  }

  render() {
    const {type} = this.state
    const {msg, redirectTo} = this.props.user
    // If redirectTo has a value, you need to redirect to the specified route
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }

    return (
      <div>
        <NavBar>Hire Easy</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            {msg ? <div className='error-msg'>{msg}</div> : null}
            <WhiteSpace/>
            <InputItem placeholder='User Name' onChange={val => {this.handleChange('username', val)}}>User Name:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Password' type="password" onChange={val => {this.handleChange('password', val)}}>Password:</InputItem>
            <WhiteSpace/>
            <InputItem placeholder='Confirm Password' type="password" onChange={val => {this.handleChange('password2', val)}}>Confirm:</InputItem>
            <WhiteSpace/>
            <ListItem>
              <span>User type:</span>
              &nbsp;&nbsp;&nbsp;
              <Radio checked={type==='jobSeeker'} onChange={() => this.handleChange('type', 'jobSeeker')}>Job seeker</Radio>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Radio checked={type==='jobPoster'}  onClick={() => this.handleChange('type', 'jobPoster')}>Job poster</Radio>
            </ListItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>Register</Button>
            <WhiteSpace/>
            <Button onClick={this.toLogin}>Login</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {register}
)(Register)