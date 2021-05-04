const initialState = {
  rooms: []
}

export const roomReducer = (state = initialState, action) => {
  if (action.type === 'ROOM/SET_ROOMS') {
    return {
      ...state,
      rooms: action.data
    }
  }
  return state
}