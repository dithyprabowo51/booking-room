import axios from '../../../../lib/axios.js'
import { fetchBookings } from './fetchBookings.js'

export const deleteBookingUser = payload => async dispatch => {
  try {
    await axios({
      url: `/user-bookings/${payload.id}`,
      method: 'DELETE',
      headers: { access_token: localStorage.getItem('access_token') }
    })
    dispatch(fetchBookings())
  } catch (err) {
    console.log(err)
  }
}