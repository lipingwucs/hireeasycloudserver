import React, {Component} from 'react'
import {connect} from 'react-redux'
import {applyHistory} from '../../redux/actions'
import JobList from '../../components/job-list/job-list'



  class ApplyHistory extends Component {
    
    componentDidMount () { 
        this.props.applyHistory()
      }
    render(){
        return (      
            <JobList jobList={this.props.jobList}/>
         )
    }    
  }
  export default connect(
    state=>({jobList:state.jobList}),
    {applyHistory}
  )(ApplyHistory)