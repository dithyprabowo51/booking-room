import axios from '../../../../lib/axios.js'

export const fetchAllBookings = () => async dispatch => {
  try {
    const { data } = await axios({
      url: '/admin-bookings',
      method: 'GET',
      headers: { access_token: localStorage.getItem('access_token') }
    })
    dispatch({ type: 'BOOKING/SET_BOOKINGS', data: data.data })
  } catch (err) {
    console.log(err)
  }
}