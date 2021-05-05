import axios from '../../../../lib/axios.js'

export const fetchBookings = () => async dispatch => {
  try {
    const { data } = await axios({
      url: '/user-bookings',
      method: 'GET',
      headers: { access_token: localStorage.getItem('access_token') }
    })
    dispatch({ type: 'BOOKING/SET_BOOKINGS', data: data.data })
  } catch (err) {
    console.log(err)
  }
}