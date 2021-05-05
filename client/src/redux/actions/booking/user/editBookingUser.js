import axios from '../../../../lib/axios.js'
import { fetchBookings } from './fetchBookings'

export const editBookingUser = payload => async dispatch => {
  try {
    await axios({
      url: `/user-bookings/${payload.id}`,
      method: 'PUT',
      headers: { access_token: localStorage.getItem('access_token') },
      data: {
        participants: payload.participants,
        room_id: payload.room_id,
        date_booking: payload.date_booking,
        time_from_booking: payload.time_from_booking,
        time_to_booking: payload.time_to_booking,
      }
    })
    dispatch(fetchBookings())
  } catch (err) {
    console.log(err)
  }
}