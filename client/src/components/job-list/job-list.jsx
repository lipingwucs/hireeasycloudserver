/*
UI component that displays the list of jobs
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank, WhiteSpace, Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'


const Header = Card.Header
const Body = Card.Body

class JobList extends Component {
  static propTypes = {
    jobList: PropTypes.array.isRequired
  }  

  render () {
    const {jobList} = this.props

    return (
      <WingBlank style={{marginBottom:50, marginTop:50}}>
        <QueueAnim type='scale'>
          {
            jobList.map(job => (
              <div key={job._id}>
                <WhiteSpace/>
                <Card style={{backgroundColor:'#FFE4E1'}} >  
                  <Header                   
                    extra={job.jobTitle}
                    onClick={()=>{ this.props.history.push(`/jobDetail/${job._id}`)}}
                  />
                  <Body>
                  <div>position: {job.position}</div>
                 
                  {job.company ? <div>company: {job.company}</div> : null}    
                  <div>location: {job.postCode} <button onClick={()=>{ this.props.history.push(`/jobGeo/${job._id}`); }  }> Map</button></div>              
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

export default withRouter(JobList)

