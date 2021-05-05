import axios from '../../../lib/axios.js'
import { fetchAllUsers } from './fetchAllUsers.js'

export const updateRole = payload => async dispatch => {
  try {
    await axios({
      url: `/users/${payload.id}`,
      method: 'PATCH',
      headers: { access_token: localStorage.getItem('access_token') },
      data: {
        user_role: payload.user_role
      }
    })
    dispatch(fetchAllUsers())
  } catch (err) {
    console.log(err)
  }
}