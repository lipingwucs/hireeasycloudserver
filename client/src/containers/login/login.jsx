/*
Login routing component
 */

import React, {Component} from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'

import Logo from '../../components/logo/logo'


class Login extends Component {
  state = {
    username: '',  // username
    password: '',  // password
  }

  login = () => {
    this.props.login(this.state)
  }

  // Process input data changes: update the corresponding state
  handleChange = (name, val) => {
    // update status
    this.setState({
      [name]: val  // The attribute name is not name, but the value of the name variable
    })
  }

  toRegister = () => {
    this.props.history.replace('/register')
  }

  render() {

    const {msg, redirectTo} = this.props.user
    // If redirectTo has a value, then need to redirect to the specified route
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

            <Button type='primary' onClick={this.login}>Login</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>No account yet</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {login}
)(Login)