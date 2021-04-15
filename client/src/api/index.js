/*
A module containing certain functions required by the interface
The return value of this function: promise
 */

import ajax from './ajax'

// Registration interface
export const reqRegister = (user) => ajax('/register', user, 'POST')
// Login interface
export const reqLogin = ({username, password}) => ajax('/login',{username, password}, 'POST')
// Update user interface
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// Get user interface
export const reqUser = () => ajax('/user')

//Get user list interface
export const reqUserList = (type) => ajax('/userlist', {type})
//Get candidates interface
export const reqVeiwCandidates=(jobId)=>ajax('/viewCandidates',{jobId})
//Create job 
export const reqCreateJob = (job) => ajax('/createJob',job,'POST')

//Get job detail
export const reqJobDetail = (jobId) => ajax('/jobDetail',{jobId},'POST')

//Update job 
export const reqUpdateJob = (job) => ajax('/updateJob',job,'POST')
//Delete job 
export const reqDeleteJob = () => ajax('/deleteJob',{},'POST')
//Get jobs
export const reqGetJobs=()=>ajax('/getJobs')
//Get jobPoster
export const reqGetJobPoster=(posterId)=>ajax('/getJobPoster',{posterId},'POST')
//Get job list interface
export const reqJobList = () => ajax('/joblist')

// Get the current user's chat message list
export const reqChatMsgList = () => ajax('/msglist')

// Modify the specified message as read
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')

// Modify the specified message as read
export const reqApplyHistory = () => ajax('/applyHistory')

export const reqReportUser = (report) => ajax('/reportUser',report,'POST')

export const reqReportList = () => ajax('/reportList')
export const reqFindUser= (username) => ajax('/findUser',{username},'POST')
export const reqLockAccount=(user)=>ajax('/lockAccount',user,'POST')
