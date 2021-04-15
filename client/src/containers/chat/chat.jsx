/*
The routing component of the conversation chat
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim'

import {sendMsg, readMsg} from '../../redux/actions'


const Item = List.Item

class Chat extends Component {

  state = {
    content: '',
    isShow: false // Whether to show the emoticon list
  }

  // Call back before the first render()
  componentWillMount () {
    // Initialize emoticon list data
    const emojis = ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
      ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }

  componentDidMount() {
    // Initial display list
    window.scrollTo(0, document.body.scrollHeight)

  }

  componentDidUpdate () {
    // Update the display list
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillUnmount () { // Before exiting
    //Unread status of sending request update message
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }

  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow) {
      // Asynchronously manually dispatch the resize event to solve the bug in the emoji list display
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  handleSend = () => {
    // Data collection
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    // Send request (send message)
    if(content) {
      this.props.sendMsg({from, to, content})
    }
    // Clear input data
    this.setState({
      content: '',
      isShow: false
    })
  }
  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat

    // Calculate the chatId of the current chat
    const meId = user._id
    if(!users[meId]) { // If the data has not been obtained, nothing will be displayed directly
      return null
    }
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')

    // Filter chatMsgs
    const msgs = chatMsgs.filter(msg => msg.chat_id===chatId)

    // Get the avatar image object of the target user
    const targetAvatar = users[targetId].avatar
    const targetIcon = targetAvatar ? require(`../../assets/images/${targetAvatar}.png`) : null

    return (
      <div id='chat-page'>
        <NavBar
          icon={<Icon type='left' text='left'/>}
          className='sticky-header'
          onLeftClick={()=> this.props.history.goBack()}
        >
          {users[targetId].username}
        </NavBar>
        <List style={{marginTop:50, marginBottom: 50}}>
          {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
          <QueueAnim type='left' delay={100}>
            {
              msgs.map(msg => {
                if(targetId===msg.from) {// Sent to me
                  return (
                    <Item
                      key={msg._id}
                      thumb={targetIcon}
                    >
                      {msg.content}
                    </Item>
                  )
                } else { // I sent 
                  return (
                    <Item
                      key={msg._id}
                      className='chat-me'
                      extra='Me'
                    >
                      {msg.content}
                    </Item>
                  )
                }
              })
            }
          </QueueAnim>

        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="Please enter"
            value={this.state.content}
            onChange={val => this.setState({content: val})}
            onFocus={() => this.setState({isShow: false})}
            extra={
              <span>
                <span onClick={this.toggleShow} style={{marginRight:5}}>😊</span>
                <span onClick={this.handleSend}>Send</span>
              </span>
            }
          />
          {this.state.isShow ? (
            <Grid
              data={this.emojis}
              columnNum={8}
              carouselMaxRow={4}
              isCarousel={true}
              onClick={(item) => {
                this.setState({content: this.state.content + item.text})
              }}
            />
          ) : null}

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)