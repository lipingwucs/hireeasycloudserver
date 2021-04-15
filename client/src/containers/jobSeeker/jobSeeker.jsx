/*
Job seeker main interface routing container component
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
//import {getUserList,getJobs} from '../../redux/actions'
import {getJobs} from '../../redux/actions'

//import UserList from '../../components/user-list/user-list'
import JobList from '../../components/job-list/job-list'
 
class JobSeeker extends Component {
  componentDidMount () {
    this.props.getJobs()

  }
  render () {
    return (
      <div>
      <JobList jobList={this.props.jobList}/>
      </div>
    )
  }
}

export default connect(
  state => ({jobList:state.jobList}),
  {getJobs}
)(JobSeeker)