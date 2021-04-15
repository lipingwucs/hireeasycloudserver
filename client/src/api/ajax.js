/*
Function module that can send ajax request
The return value of the function is a promise object
 */
import axios from 'axios'
const baseUrl = ''
// const baseUrl = 'http://localhost:4000'
export default function ajax(url, data={}, type='GET') {
  url = baseUrl + url
  if(type==='GET') { // Send GET request
    // Combine request parameter string
    // data: {username: tom, password: 123}
    // paramStr: username=tom&password=123
    let paramStr = ''
    Object.keys(data).forEach(key => {
      paramStr += key + '=' + data[key] + '&'
    })
    if(paramStr) {
      paramStr = paramStr.substring(0, paramStr.length-1)
    }
    // Use axios to send get request
    return axios.get(url + '?' + paramStr)
  } else {// Send POST request
    // Use axios to send post request
    return axios.post(url, data)
  }
}
