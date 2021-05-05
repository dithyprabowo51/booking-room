import axios from '../../../../lib/axios.js'
import { fetchAllBookings } from './fetchAllBookings'

export const editBooking = payload => async dispatch => {
  try {
    await axios({
      url: `/admin-bookings/${payload.id}`,
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
    dispatch(fetchAllBookings())
  } catch (err) {
    console.log(err)
  }
}