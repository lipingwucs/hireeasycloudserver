/*
The routing container component of improving job applicant information
 */

import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {NavBar, InputItem, Button, TextareaItem} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'
import {updateUser} from '../../redux/actions'
class JobSeekerInfo extends Component {

  state = {
    avatar: '',
    info: '',
    careerObjective:''
  }

  // Update avatar status
  setAvatar = (avatar) => {
    this.setState({
      avatar
    })
  }

  handleChange = (name, value) => {
    // debugger
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
        <NavBar>Complete job seekr information</NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <InputItem placeholder='Please enter a career objective' onChange={val => {this.handleChange('careerObjective', val)}}>Objective:</InputItem>                
        <TextareaItem title="Skills:"
                      placeholder='Please enter skills'
                      rows={3} onChange={val => {this.handleChange('info', val)}}/>
        <Button type='primary' onClick={this.save}>Save</Button>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {updateUser}
)(JobSeekerInfo)