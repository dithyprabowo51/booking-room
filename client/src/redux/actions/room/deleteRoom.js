import axios from '../../../lib/axios.js'
import { fetchAllRooms } from './fetchAllRooms.js'

export const deleteRoom = payload => async dispatch => {
  try {
    await axios({
      url: `/rooms/${payload.id}`,
      method: 'DELETE',
      headers: { access_token: localStorage.getItem('access_token') }
    })
    dispatch(fetchAllRooms())
  } catch (err) {
    console.log(err)
  }
}