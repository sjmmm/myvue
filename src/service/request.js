import axios from 'axios'
// axios.defaults.baseURL = '';
// axios.defaults.withCredentials = true

const request = (url, options) => {
  return new Promise((resolve) => {
    axios({
      method: "get",
      url,
      ...options
    }).then(res => {
      return res.data
    }).then(data => {
      resolve(data)
    }).catch(error => {
      if(error.response) {
        // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      }
      // console.log(error)
    })
  })
}

export default request;
