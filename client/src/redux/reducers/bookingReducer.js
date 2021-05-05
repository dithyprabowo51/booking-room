const initialState = {
  bookings: []
}

export const bookingReducer = (state = initialState, action) => {
  if (action.type === 'BOOKING/SET_BOOKINGS') {
    return {
      ...state,
      bookings: action.data
    }
  }
  return state
}