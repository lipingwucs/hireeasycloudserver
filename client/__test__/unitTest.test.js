import * as actions from '../src/redux/actions'

test("Error_msg action",()=>{
    const job={}
    const expected={
        type:'error_msg',
        data:'Job Title is required!'
    }
    expect(actions.createJob(job)).toEqual(expected);
})

  
 
  test("Login action",()=>{
    const user={
        username:'job Seeker 1',
        password:'password'
    }
    const expected=expect.any(Function)
    expect(actions.login(user)).toEqual(expected);
})

test("Register action",()=>{
    const user={
        username:'job Seeker 2',
        password:'password',
        password2:'password',
        type:'jobPoster'
    }
    const expected=expect.any(Function)
    expect(actions.register(user)).toEqual(expected);
})

test("GetUserList action",()=>{
    const type='jobPoster'
    const expected=expect.any(Function)
    expect(actions.getUserList(type)).toEqual(expected);
})

test("GetJobList action",()=>{
    const posterId='604cec9cc6814d1668b390fd'
    const expected=expect.any(Function)
    expect(actions.getJobList(posterId)).toEqual(expected);
})
