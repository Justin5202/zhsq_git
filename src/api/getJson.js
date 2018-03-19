import axios from 'axios'
export function getJson(name) {
    return axios.get(`http://zhsq.digitalcq.com/D2CJsonV3${name}`, {withCredentials: false}).then(res => {
      return Promise.resolve(res.data)
    })
}
