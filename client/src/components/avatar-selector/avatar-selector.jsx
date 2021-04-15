/*
Select the UI component of the user avatar
 */

import React, {Component} from 'react'
import {List, Grid} from 'antd-mobile'
import PropTypes from 'prop-types'

export default class AvatarSelector extends Component {

  static propTypes = {
    setAvatar: PropTypes.func.isRequired
  }

  state = {
    icon: null //Picture object, no value by default
  }

  constructor(props) {
    super(props)
    // Prepare the list data to be displayed
    this.avatarList = []
    for (let i = 0; i < 20; i++) {
      this.avatarList.push({
        text: 'avatar'+(i+1),
        icon: require(`../../assets/images/avatar${i+1}.png`) // Cannot use import
      })
    }
  }

  handleClick = ({text, icon}) => {
    // Update current component status
    this.setState({icon})
    // Call a function to update the state of the parent component
    this.props.setAvatar(text)
  }

  render () {
    // Avatar
    const {icon} = this.state
    const listAvatar = !icon ? 'Please choose an avatar' : (
      <div>
       Avatar selected:<img src={icon}/>
      </div>
    )

    return (
      <List renderHeader={() => listAvatar}>
        <Grid data={this.avatarList}
              columnNum={5}
              onClick={this.handleClick}/>
      </List>
    )
  }
}