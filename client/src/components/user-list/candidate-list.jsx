/*
UI component that displays the list of specified users
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card, Button} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
const Header = Card.Header
const Body = Card.Body

class CandidateList extends Component {
  static propTypes = {
    candidateList: PropTypes.array.isRequired
  }
  toMain=()=>{
      this.props.history.replace('/')
  }
  render () {
    const {candidateList} = this.props

    return (
      <WingBlank style={{marginBottom:20, marginTop:20}}>
        <QueueAnim type='scale'>
          {
            candidateList.map(candidate => (
              <div key={candidate._id}>
                <WhiteSpace/>
                <Card onClick={() => this.props.history.push(`/chat/${candidate._id}`)}>
                  <Header
                    thumb={require(`../../assets/images/${candidate.avatar}.png`)}
                    extra={candidate.username}
                  />
                  <Body>
                  <div>Objective: {candidate.careerObjective}</div>
                  <div>Skills:{candidate.info}</div>
                  <button>Chat with me</button>
                  </Body>
                </Card>
              </div>
            ))
          }
        </QueueAnim>
        <Button type='primary'style={{marginTop:'20px'}} onClick={this.toMain}>Back to Main</Button>
      </WingBlank>
    )
  }
}

export default withRouter(CandidateList)