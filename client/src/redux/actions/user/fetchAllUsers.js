import axios from '../../../lib/axios.js'

export const fetchAllUsers = () => async dispatch => {
  try {
    const { data } = await axios({
      url: '/users',
      method: 'GET',
      headers: { access_token: localStorage.getItem('access_token') }
    })
    dispatch({ type: 'USER/SET_USERS', data: data.data })
  } catch (err) {
    console.log(err)
  }
}