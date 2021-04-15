import React, {Component} from 'react'
import {Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {viewCandidates} from '../../redux/actions'
import { withRouter } from 'react-router'


  class ViewCandidates extends Component {
    
    handleOnclick=()=>{ 
        const jobId=this.props.jobId;                                      
        this.props.viewCandidates(jobId);
        this.props.history.replace('/viewCandidates')           
    }
    render(){
        return(
            <Button inline size="small" style={{margin: '0px 6px 0px 6px',backgroundColor:'#1E90FF',color:'black' }}  onClick={this.handleOnclick}>View Candidates</Button>
        )
    }    
  }
  export default withRouter(connect(
    state=>({candidates:state.candidates}),
    {viewCandidates}
  )(ViewCandidates))