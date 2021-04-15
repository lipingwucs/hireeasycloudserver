import React, {Component} from 'react'
import {Button,Modal} from 'antd-mobile'
import {connect} from 'react-redux'
import {updateUser,updateJob} from '../../redux/actions'
import { withRouter } from 'react-router'

  class ApplyJob extends Component {
    state={
      appliedJob:[]
    }
    save = (user,job) => {
        this.props.updateUser(user)
        this.props.updateJob(job)
      }
    addJobIntoUser=()=>{
      const jobId=this.props.jobId;
      const arr=this.props.user.appliedJob;
      if(typeof(arr)==='undefined'){
        this.props.user.appliedJob=new Array();
        this.props.user.appliedJob.push(jobId);
        return true
      }
      if(typeof(arr)!=='undefined'&&arr.indexOf(jobId)<=-1){
        this.props.user.appliedJob.push(jobId);
        return true
      }      
    }
    addUserIntoJob=()=>{
      const userId=this.props.user._id;
      const arr2=this.props.jobDetail.applicant;
      if(typeof(arr2)==='undefined'){
        this.props.jobDetail.applicant=new Array();
        this.props.jobDetail.applicant.push(userId);
        return true
      }
      if(typeof(arr2)!=='undefined'&&arr2.indexOf(userId)<=-1){           
        this.props.jobDetail.applicant.push(userId);
        return true
      }
    }
    handleOnclick=()=>{
        const isJobAdded=this.addJobIntoUser()
        const isUserAdded=this.addUserIntoJob()
        
        if(isJobAdded&&isUserAdded){            
           Modal.alert('Apply job', 'Congratulation! You successfully applied this job.', [            
            {
              text: 'OK',
              onPress: ()=> {
                this.save(this.props.user,this.props.jobDetail) 
                this.props.history.replace('/')
              }
            }
          ])   
        }
        else{
          Modal.alert('Apply job', 'You have already applied this job.', [            
            {
              text: 'OK',
            }
          ])     
        }              
    }
    render(){
        return(
        <Button style={{backgroundColor:'#1E90FF',color:'black' }}  onClick={this.handleOnclick}>Apply</Button>
        )
    }    
  }
  export default withRouter( connect(
    state=>({user:state.user,jobDetail:state.jobDetail}),
    {updateUser,updateJob}
  )(ApplyJob))