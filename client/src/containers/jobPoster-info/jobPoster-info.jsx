/*
The routing container component of improving job poster information
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

import {updateUser} from '../../redux/actions'

class JobPosterInfo extends Component {

  state = {
    avatar: '',
    post: '',
    
    company: '',
    info:''
  }

  // Update avatar status
  setAvatar = (avatar) => {
    this.setState({
      avatar
    })
  }

  handleChange = (name, value) => {
    this.setState({
      [name]: value
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render () {
    // If the information is complete, it will be automatically redirected to the corresponding main interface
    const {avatar, type} = this.props.user
    if(avatar) { // information is complete
      const path = type==='jobSeeker' ? '/jobSeeker' : '/jobPoster'
      return <Redirect to={path}/>
    }

    return (
      <div>
        <NavBar>Complete job poster informaion</NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <InputItem placeholder='Please enter your position' onChange={val => {this.handleChange('post', val)}}>Position:</InputItem>
        <InputItem placeholder='Please enter company name' onChange={val => {this.handleChange('company', val)}}>Company:</InputItem>
        {/* <InputItem placeholder='Please enter job salary' onChange={val => {this.handleChange('salary', val)}}>Salary:</InputItem> */}
        <TextareaItem title="Information:"
                      placeholder='Please enter your information'
                      rows={3} onChange={val => {this.handleChange('info', val)}}/>
        <Button type='primary' onClick={this.save}>Save</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(JobPosterInfo)