import axios from '../../../../lib/axios.js'
import { fetchBookings } from './fetchBookings.js'

export const addBookingUser = payload => async dispatch => {
  try {
    await axios({
      url: '/user-bookings',
      method: 'POST',
      headers: { access_token: localStorage.getItem('access_token') },
      data: {
        room_id: payload.room_id,
        participants: payload.participants,
        date_booking: payload.date_booking,
        time_from_booking: payload.time_from_booking,
        time_to_booking: payload.time_to_booking
      }
    })
    dispatch(fetchBookings())
  } catch (err) {
    console.log(err)
  }
}