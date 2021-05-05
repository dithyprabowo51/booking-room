import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://booking-app-adit.herokuapp.com'
})

export default instance