/*
Message interface routing container component
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs, userid) {
  // Find out the lastMsg of each chat, and use an object container to save {chat_id:lastMsg}
  const lastMsgObjs = {}
  chatMsgs.forEach(msg => {

    // Perform individual statistics on msg
    if(msg.to===userid && !msg.read) {
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }

    // Get the chat ID of msg
    const chatId = msg.chat_id
    // Get the saved lastMsg of the current component
    let lastMsg = lastMsgObjs[chatId]
  
    if(!lastMsg) { //The current msg is the lastMsg of the group
      lastMsgObjs[chatId] = msg
    } else {
      // Accumulated unReadCount = already counted + current msg
      const unReadCount = lastMsg.unReadCount + msg.unReadCount
      // If msg is later than lastMsg, save msg as lastMsg
      if(msg.create_time>lastMsg.create_time) {
        lastMsgObjs[chatId] = msg
      }
      //Save unReadCount on the latest lastMsg
      lastMsgObjs[chatId].unReadCount = unReadCount
    }
  })

  // Get the array of all lastMsg
  const lastMsgs = Object.values(lastMsgObjs)

  // Sort the array (descending by create_time)
  lastMsgs.sort(function (m1, m2) { // If the result is <0, put m1 in front, if the result is 0, unchanged, if the result is >0, put m2 in front
    return m2.create_time-m1.create_time
  })
  console.log(lastMsgs)
  return lastMsgs
}

class Message extends Component {

  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    // Group chatMsgs by chat_id
    const lastMsgs = getLastMsgs(chatMsgs, user._id)


    return (
      <List style={{marginTop:50, marginBottom: 50}}>

        {
          lastMsgs.map(msg =>{
            // Get the id of the target user
            const targetUserId = msg.to===user._id ? msg.from : msg.to
            // Get information about target users
            const targetUser = users[targetUserId]
            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={targetUser.avatar ? require(`../../assets/images/${targetUser.avatar}.png`) : null}
                arrow='horizontal'
                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)