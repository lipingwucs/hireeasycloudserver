import React from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Modal,
  Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {getJobDetail,updateJob,deleteJob,getJobPoster,updateUser} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'
import ApplyJob from '../../components/apply-job/apply-job'
import ViewCandidates from '../../components/view-candidates/view-candidates'

let posterId

class JobDetail extends React.Component {  
      state = {
        jobTitle:'',
        jobType:'',
        content:'',
        company:'',
        position:'',    
        postCode: '',
        expire:''          
      }  
    componentDidMount () {
      const jobId= this.props.match.params.jobid;
      this.props.getJobDetail(jobId);               
    }
   
    getJobPoster=()=>{
      posterId=this.props.jobDetail.posterId;    
      this.props.getJobPoster(posterId);      
    }
   
    // Process input data changes: update the corresponding state
  handleChange = (name, val) => {
    const {jobTitle,jobType,content,company,position,expire}=this.props.jobDetail;
      this.setState({jobTitle:jobTitle,jobType:jobType,content:content,company:company,position:position,expire:expire},function(){
        this.setState({
          [name]: val  // The attribute name is not name, but the value of the name variable
        })
      })
    // update status
  }
  
  updateJob=()=>{
    const {jobTitle,jobType,content,company,postCode,position,expire}=this.state
    if(jobTitle===''&&jobType===''&&content===''&&postCode===''&&company===''&&position===''&&expire===''){
      this.props.updateJob(this.props.jobDetail);
    }
    else{
      this.props.updateJob(this.state);
    } 
    this.props.history.replace('/')
  }

  deleteJob=()=>{
    Modal.alert('Delete Job', 'Are you sure to this job?', [
      {text: 'Cancle'},
      {
        text: 'Yes',
        onPress: ()=> {
          this.props.deleteJob();
          const appliedJob=this.props.user.appliedJob
          const jobId=this.props.jobDetail._id;
          //Remove applied job from user 
          const pos2=appliedJob.indexOf(jobId)        
          appliedJob.splice(pos2,1);
          this.props.updateUser(this.props.user);
          this.props.history.replace('/')
        }
      }
    ])    
  }
  deleteApplication=()=>{
    Modal.alert('Delete application', 'Are you sure to delete this application?', [
      {text: 'Cancle'},
      {
        text: 'Yes',
        onPress: ()=> {
          const applicant=this.props.jobDetail.applicant
          const appliedJob=this.props.user.appliedJob
          const userId=this.props.user._id;
          const jobId=this.props.jobDetail._id;
          const pos2=appliedJob.indexOf(jobId)
          const pos=applicant.indexOf(userId)
          applicant.splice(pos,1);
          appliedJob.splice(pos2,1);
          this.props.updateJob(this.props.jobDetail);
          this.props.updateUser(this.props.user);
          this.props.history.replace('/applyHistory')
        }
      }
    ])
  }
  toMain = () => {
    posterId=''
    this.props.history.replace('/')
  }
  render() {
    const userType=this.props.user.type;
    const userId=this.props.user._id;
    const applicant=this.props.jobDetail.applicant
    const {jobTitle,jobType,content,company,position,postCode, expire}=this.props.jobDetail;             
        return (
        <div>      
           <NavBar>Job Detail</NavBar>         
            <WingBlank>
            { userType==='jobPoster'? 
               <div>
                <List>                                   
                  <WhiteSpace />
                  <InputItem placeholder={jobTitle} onChange={jobTitle=>this.handleChange('jobTitle',jobTitle)}>Job Title:</InputItem>
                  <WhiteSpace/>
                  <InputItem placeholder={jobType} onChange={val => {this.handleChange('jobType', val)}}>Job Type:</InputItem>
                  <WhiteSpace/>
                  <InputItem placeholder={content} onChange={val => {this.handleChange('content', val)}}>Content:</InputItem>
                  <WhiteSpace/>          
                  <WhiteSpace/>
                  <InputItem placeholder={company} onChange={val => {this.handleChange('company', val)}}>Company:</InputItem>
                  <WhiteSpace/>
                  <WhiteSpace/>
                  <InputItem placeholder={position} onChange={val => {this.handleChange('position', val)}}>Position:</InputItem>
                  <WhiteSpace/>
                  <WhiteSpace/>
                  <InputItem placeholder={postCode} onChange={val => {this.handleChange('postCode', val)}}>Post Code:</InputItem>
                  <WhiteSpace/>
                  <WhiteSpace/>
                  <InputItem placeholder={expire} onChange={val => {this.handleChange('expire', val)}}>Expire:</InputItem>
                  <WhiteSpace/>                                                                              
                </List>
                <WhiteSpace/>   
                <Button type="primary" inline size="small" style={{ margin: '0px 6px 0px 6px',color:'black' }} onClick={this.updateJob}>Update Job</Button>  
                <ViewCandidates  jobId={this.props.match.params.jobid}/>
                <Button type="warning" inline size="small" style={{ margin: '0px 6px 0px 6px',color:'black' }} onClick={this.deleteJob}>Delete Job</Button>                      
                <Button type="primary"  style={{backgroundColor:'coral', color:'black' }}  onClick={()=>{ this.props.history.push(`/jobGeo/${this.props.match.params.jobid}`); }  }> Map</Button>               
                <WhiteSpace/>
             </div>
            :
            <div>
              <List>                                   
                <WhiteSpace style={{marginTop: 40+ 'px'}}/>
                <InputItem value={jobTitle} >Job Title:</InputItem>
                <WhiteSpace/>
                <InputItem value={jobType}>Job Type:</InputItem>
                <WhiteSpace/>
                <InputItem value={content}>Content:</InputItem>
                <WhiteSpace/>          
                <WhiteSpace/>
                <InputItem value={company}>Company:</InputItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem value={position}>Position:</InputItem>
                <WhiteSpace/>
                <WhiteSpace/>
                <InputItem value={expire}>Expire:</InputItem>
                <WhiteSpace/>                                                                              
              </List>
              <WhiteSpace/>  
              <Button type='primary' onClick={this.getJobPoster}>See job poster</Button>             
              {posterId===''?'':<UserList userList={this.props.jobPoster}/> }
              {applicant? applicant.indexOf(userId)>-1?<Button type='warning' onClick={this.deleteApplication}>Delete my application</Button>:<ApplyJob jobId={this.props.match.params.jobid}/>:''}
              <WhiteSpace/>
              </div>
            }
            <Button type='primary' onClick={this.toMain}>Back to Main</Button>
            </WingBlank>
        </div>
        )
    }
}


export default connect(
    state=>({jobDetail:state.jobDetail,user:state.user,jobPoster:state.jobPoster}),
    {getJobDetail,updateJob,deleteJob,getJobPoster,updateUser}
) (JobDetail)