import axios from 'axios'
import {Message} from 'element-ui'
// import baseURLConfig from './config-baseURL'

// console.log(baseURLConfig,'baseURLConfig')

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.baseURL = 'https://note-server.hunger-valley.com'
axios.defaults.withCredentials = true

export default function request(url,type='GET',data={}){
  return new Promise((resolve,reject) => {
    let option = {
      url,
      method:type,
      validateStatus(status){
        return (status>=200&&status<300) || status === 400
      }
    }
    if(type.toLowerCase() === 'get'){
      option.params = data
    }else{
      option.data = data
    }
    axios(option).then(res => {
      if(res.status === 200){
        resolve(res.data)
      }else{
        // console.err(res.data)
        Message.error(res.data.msg)
        // Message({
        //   type:'error',
        //   message:res.data.msg
        // })
        reject(res.data)
      }
    }).catch(err => {
      // console.err({msg:'网络异常'})
      Message({
        type:'error',
        message:'网络异常'
      })
      reject({msg:'网络异常'})
    })
  })
}