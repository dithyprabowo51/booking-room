import axios from '../../../lib/axios.js'
import { fetchAllRooms } from './fetchAllRooms.js'

export const editRoom = payload => async dispatch => {
  try {
    await axios({
      url: `/rooms/${payload.id}`,
      method: 'PUT',
      headers: { access_token: localStorage.getItem('access_token') },
      data: {
        room_name: payload.room_name,
        min_capacity: payload.min_capacity,
        max_capacity: payload.max_capacity,
      }
    })
    dispatch(fetchAllRooms())
  } catch (err) {
    console.log(err)
  }
}