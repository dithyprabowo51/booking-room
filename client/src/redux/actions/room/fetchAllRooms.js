import axios from '../../../lib/axios.js'

export const fetchAllRooms = () => async dispatch => {
  try {
    const { data } = await axios({
      url: '/rooms',
      method: 'GET',
      headers: { access_token: localStorage.getItem('access_token') }
    })
    dispatch({ type: 'ROOM/SET_ROOMS', data: data.data })
  } catch (err) {
    console.log(err)
  }
}