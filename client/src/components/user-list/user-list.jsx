/*
UI component that displays the list of specified users
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component {
  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  render () {
    const {userList} = this.props

    return (
      <WingBlank style={{marginBottom:20, marginTop:20}}>
        <QueueAnim type='scale'>
          {
            userList.map(user => (
              <div key={user._id}>
                <WhiteSpace/>
                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                  <Header
                    thumb={require(`../../assets/images/${user.avatar}.png`)}
                    extra={user.username}
                  />
                  <Body>
                  <div>position: {user.post}</div>
                  {user.company ? <div>company: {user.company}</div> : null} 
                  <button>Chat with me</button>
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>
      </WingBlank>
    )
  }
}

export default withRouter(UserList)