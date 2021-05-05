import axios from '../../../../lib/axios.js'
import { fetchAllBookings } from './fetchAllBookings.js'

export const addBooking = payload => async dispatch => {
  try {
    await axios({
      url: '/admin-bookings',
      method: 'POST',
      headers: { access_token: localStorage.getItem('access_token') },
      data: {
        user_id: payload.user_id,
        room_id: payload.room_id,
        participants: payload.participants,
        date_booking: payload.date_booking,
        time_from_booking: payload.time_from_booking,
        time_to_booking: payload.time_to_booking
      }
    })
    dispatch(fetchAllBookings())
  } catch (err) {
    console.log(err)
  }
}