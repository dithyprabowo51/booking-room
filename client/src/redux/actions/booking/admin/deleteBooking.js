import axios from '../../../../lib/axios.js'
import { fetchAllBookings } from './fetchAllBookings.js'

export const deleteBooking = payload => async dispatch => {
  try {
    await axios({
      url: `/admin-bookings/${payload.id}`,
      method: 'DELETE',
      headers: { access_token: localStorage.getItem('access_token') }
    })
    dispatch(fetchAllBookings())
  } catch (err) {
    console.log(err)
  }
}