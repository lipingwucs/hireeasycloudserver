/*
Contains action creators
Asynchronous action
Synchronization action
 */
import io from 'socket.io-client'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  CANDIDATES,
  RESET_USER,
  RECEIVE_USER_LIST,
  CREATE_JOB,
  JOB_DETAIL,
  JOB_POSTER,
  RECEIVE_JOB_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG,
  MSG_READ,
  REPORT_DETAIL,
  ADMIN_USER,
  REPORT_LIST,
  USER_DETAIL
} from './action-types'
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,
  reqUserList,
  reqVeiwCandidates,
  reqCreateJob,
  reqJobDetail,
  reqUpdateJob,
  reqDeleteJob,
  reqGetJobs,
  reqGetJobPoster,
  reqJobList,
  reqChatMsgList,
  reqReadMsg,
  reqApplyHistory,
  reqReportUser,
  reqReportList,
  reqFindUser,
  reqLockAccount
} from '../api'


function initIO(dispatch, userid) {
  // Before creating an object: Determine whether the object already exists, and only create it if it does not exist
  if(!io.socket) {
    // Connect to the server, get the connection object with the server
    // io.socket = io('ws://localhost:4000')    //local server
    //io.socket = io('ws://hireeasy-server.herokuapp.com:4000') //Nabil Server
    // io.socket = io('ws://hireeasy.herokuapp.com:4000')     // Lenard Server
    io.socket = io('ws://hireeasycloudserver.herokuapp.com')     // Liping Cloud Server


    
    

    //if connect to the cloud server
    //const socket = io('https://hireeasy-server.herokuapp.com')  

    // Bind the monitor, receive the message sent by the server
    io.socket.on('receiveMsg', function (chatMsg) {
      console.log('The client receives the message sent by the server', chatMsg)
      // Only when chatMsg is a message related to the current user, will it distribute the synchronization action to save the message
      // debugger
      if(userid===chatMsg.from || userid===chatMsg.to) {
        dispatch(receiveMsg(chatMsg, userid))
      }
    })

  }
}

// Get message list data asynchronously
async function getMsgList(dispatch, userid) {
  initIO(dispatch, userid)
  const response = await reqChatMsgList()
  const result = response.data
  if(result.code===0) {
    const {users, chatMsgs} = result.data
    // Distribute synchronization action
    dispatch(receiveMsgList({users, chatMsgs, userid}))
  }
}

// Asynchronous action to send message
export const sendMsg = ({from, to, content}) => {
  return dispatch => {
    //console.log('The client sends a message to the server', {from, to, content})
    //Send a message
    io.socket.emit('sendMsg', {from, to, content})
  }
}

// Asynchronous action to read the message
export const readMsg = (from, to) => {
  return async dispatch => {
    const response = await reqReadMsg(from)
    const result = response.data
    if(result.code===0) {
      const count = result.data
      dispatch(msgRead({count, from, to}))
    }
  }
}

// Synchronous action for successful authorization
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// Synchronous action of error message
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})
// Receive user's synchronization action
const receiveUser = (user) => ({type: RECEIVE_USER, data:user})
//Reset user's synchronization action
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
// Synchronous action for receiving user list
const receiveUserList = (userList) => ({type: RECEIVE_USER_LIST, data: userList})
// Synchronous action for creating job
const postJob=(job)=>({type:CREATE_JOB,data:job})
// Synchronous action for getting job detail
const jobDetail=(jobDetail)=>({type:JOB_DETAIL,data:jobDetail})
// Synchronous action for getting job poster
const jobPoster=(jobPoster)=>({type:JOB_POSTER,data:jobPoster})
//Synchronization action that get all candidates
const candidates=(candidates)=>({type:CANDIDATES,data:candidates})
// Synchronous action for receiving job list
const receiveJobList = (jobList) => ({type: RECEIVE_JOB_LIST, data: jobList})
// Synchronous action for receiving message list
const receiveMsgList = ({users, chatMsgs, userid}) => ({type: RECEIVE_MSG_LIST, data:{users, chatMsgs, userid}})
// Synchronous action that receives a message
const receiveMsg = (chatMsg, userid) => ({type: RECEIVE_MSG, data: {chatMsg, userid}})
//Synchronization action that read a chat message
const msgRead = ({count, from, to}) => ({type: MSG_READ, data: {count, from, to}})
//Synchronization action that get job detail
const reportDetail = (reportDetail) => ({type: REPORT_DETAIL, data: reportDetail})
//Synchronization action that login as admin
const adminUser=(admin)=>({type:ADMIN_USER,data:admin})
//Synchronization action that get report list
const reportList=(reportList)=>({type:REPORT_LIST,data:reportList})
//Synchronization action that get user detail
const userDetail=(userDetail)=>({type:USER_DETAIL,data:userDetail})


// Register asynchronous action
export const register = (user) => {
  const {username, password, password2, type} = user
  // Do the front-end check of the form, if it fails, return a synchronous action of errorMsg
  if(!username) {
    return errorMsg('User Name is required!')
  } else if(password!==password2) {
    return errorMsg('Password should match!')
  }
  if(username==='admin'||username==='Admin'){
    return errorMsg('The user already exist!')
  }
  // The form data is valid, return an asynchronous action function that sends an ajax request
  return async dispatch => {


    // Send registered asynchronous ajax request
    /*const promise = reqRegister(user)
    promise.then(response => {
      const result = response.data  // {code: 0/1, data: user, msg: ''}
    })*/
    const response = await reqRegister({username, password, type})
    const result = response.data //  {code: 0/1, data: user, msg: ''}
    if(result.code===0) {
      getMsgList(dispatch, result.data._id)
      // Dispatch authorized synchronization actions
      dispatch(authSuccess(result.data))
    } else { 
      // Dispatch synchronization error messages
      dispatch(errorMsg(result.msg))
    }
  }
}

// Login asynchronous action
export const login = (user) => {

  const {username, password} = user
  // Do the front-end check of the form, if it fails, return a synchronous action of errorMsg
  if(!username) {
    return errorMsg('User Name is required!')
  } else if(!password) {
    return errorMsg('Password is required!')
  }

  return async dispatch => {
    // Send login asynchronous ajax request
    /*const promise = reqLogin(user)
    promise.then(response => {
      const result = response.data  // {code: 0/1, data: user, msg: ''}
    })*/
    const response = await reqLogin(user)
    const result = response.data
    if(result.code===0) {
      getMsgList(dispatch, result.data._id)
      // Dispatch authorized synchronization actions
      dispatch(authSuccess(result.data))
    }
    if(result.code===3){
      dispatch(adminUser(result.data))
    } 
    else { 
      // Dispatch synchronization error messages
      dispatch(errorMsg(result.msg))
    }
  }
}

//Update user asynchronous action
export const updateUser = (user) => {
  return async dispatch => {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0) { // Update Successfully: data
      dispatch(receiveUser(result.data))
    } else { // Update failed: msg
      dispatch(resetUser(result.msg))
    }
  }
}

// Get user asynchronous action
export const getUser = () => {
  return async dispatch => {
    // Perform asynchronous ajax request
    const response = await reqUser()
    const result = response.data
    if(result.code===0) { 
      getMsgList(dispatch, result.data._id)
      dispatch(receiveUser(result.data))
    } else { 
      dispatch(resetUser(result.msg))
    }
  }
}

// Asynchronous action to get user list
export const getUserList = (type) => {
  return async dispatch => {
    // Perform asynchronous ajax request
    const response = await reqUserList(type)
    const result = response.data
    // After getting the result, distribute a synchronous action
    if(result.code===0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

// Asynchronous action to get user list
export const viewCandidates = (jobId) => {
  return async dispatch => {
    // Perform asynchronous ajax request
    const response = await reqVeiwCandidates(jobId)
    const result = response.data
    // After getting the result, distribute a synchronous action
    if(result.code===0) {
      dispatch(candidates(result.data))
    }
  }
}
// Asynchronous action to get user list
export const getJobPoster = (posterId) => {
  return async dispatch => {
    // Perform asynchronous ajax request
    const response = await reqGetJobPoster(posterId)
    const result = response.data
    // After getting the result, distribute a synchronous action
    if(result.code===0) {
      dispatch(jobPoster(result.data))
    }
  }
}

// Create job asynchronous action
export const createJob = (job) => {
  const {jobTitle, jobType, content,company,position, postCode} = job
  // Do the front-end check of the form, if it fails, return a synchronous action of errorMsg
  if(!jobTitle) {
    return errorMsg('Job Title is required!')
  } else if(!jobType) {
    return errorMsg('Job Type is required!')
  }else if(!content){
    return errorMsg('Content is required!')
  }else if(!company){
    return errorMsg('Company is required!')
  }else if(!position){
    return errorMsg('Position is required!')
  }else if(!postCode){
    return errorMsg('Post Code is required!')
  }
  // The form data is valid, return an asynchronous action function that sends an ajax request
  return async dispatch => {
    
    const response = await reqCreateJob(job)
    const result = response.data //  {code: 0/1, data: user, msg: ''}
    if(result.code===0) {
      //getMsgList(dispatch, result.data._id)
      // Dispatch authorized synchronization actions
      dispatch(postJob(result.data))
    } else { 
      // Dispatch synchronization error messages
      dispatch(errorMsg(result.msg))
    }
  }
}

// Asynchronous action to get job detail
export const getJobDetail=(jobId)=>{
  return async dispatch => {
    // Perform asynchronous ajax request
    const response = await reqJobDetail(jobId)
    const result = response.data
    // After getting the result, distribute a synchronous action
    if(result.code===0) {
      return dispatch(jobDetail(result.data))
    }
    else{
      return dispatch(errorMsg(result.msg));
    }
  }
}

// Asynchronous action to update job
export const updateJob=(job)=>{
  return async dispatch => {
    const response = await reqUpdateJob(job)
    const result = response.data
    if(result.code===0) { // Update Successfully: data
      dispatch(jobDetail(result.data))
    } else { // Update failed: msg
      dispatch(errorMsg(result.msg))
    }
  }
}

// Asynchronous action to delete job
export const deleteJob=()=>{
  return async dispatch => {
    await reqDeleteJob()
  }
}

//Asynchronous action to get jobs as job seeker
export const getJobs=()=>{
  return async dispatch=>{
    const response= await reqGetJobs()
    const result= response.data
    if(result.code===0){
      dispatch(receiveJobList(result.data))
    }
    else{
      dispatch(errorMsg(result.msg));
    }
  }
}

// Asynchronous action to get job list
export const getJobList = () => {
  return async dispatch => {
    // Perform asynchronous ajax request
    const response = await reqJobList()
    const result = response.data
    // After getting the result, distribute a synchronous action
    if(result.code===0) {
      dispatch(receiveJobList(result.data))
    }
    else{
      dispatch(errorMsg(result.msg));
    }
  }
}

// Asynchronous action to apply history
export const applyHistory = () => {
  return async dispatch => {
    // Perform asynchronous ajax request
    const response = await reqApplyHistory()
    const result = response.data
    // After getting the result, distribute a synchronous action
    if(result.code===0) {
      dispatch(receiveJobList(result.data))
    }
    else{
      dispatch(errorMsg(result.msg));
    }
  }
}

// Asynchronous action to report a user
export const reportUser=(report)=>{
  return async dispatch=>{
    const response=await reqReportUser(report)
    const result =response.data
    if(result.code===0){
      dispatch(reportDetail(result.data));
    }
    else{
      dispatch(errorMsg(result.msg));
    }
  }
}

// Asynchronous action to get report list
export const getReportList=()=>{
  return async dispatch=>{
    const response=await reqReportList()
    const result =response.data
    if(result.code===0){
      dispatch(reportList(result.data));
    }
    else{
      dispatch(errorMsg(result.msg));
    }
  }
}

// Asynchronous action to find a user
export const findUser=(username)=>{
  return async dispatch=>{
    const response=await reqFindUser(username)
    const result =response.data
    if(result.code===0){
      dispatch(userDetail(result.data));
    }
    else{
      dispatch(errorMsg(result.msg));
    }
  }
}

export const lockAccount=(user)=>{
  return async dispatch=>{
    const response=await reqLockAccount(user)
    const result=response.data
    if(result.code===0){
      dispatch(userDetail(result.data));
    }
    else{
      dispatch(errorMsg(result.msg));
    }
  }
}


