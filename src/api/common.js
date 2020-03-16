import axios from "axios"

export function login(data) {
  axios.get('/common/downloadFiles',params).then(res=>{
    console.log(res);
  })
}
