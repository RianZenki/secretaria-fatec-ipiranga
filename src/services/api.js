import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3001',

  validateStatus: function (status) {
    return status < 500
  },
})

export default api