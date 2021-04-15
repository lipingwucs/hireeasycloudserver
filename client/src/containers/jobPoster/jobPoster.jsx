/*
Job poster main interface routing container component
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getJobList} from '../../redux/actions'
import JobList from '../../components/job-list/job-list'

class JobPoster extends Component {
  componentDidMount () {
    this.props.getJobList()
  }
  render () {
    return (      
       <JobList jobList={this.props.jobList}/>
    )
  }
}

export default connect(
  state => ({jobList: state.jobList,user:state.user}),
  {getJobList}
)(JobPoster)