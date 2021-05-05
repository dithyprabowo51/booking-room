const initialState = {
  users: []
}

export const userReducer = (state = initialState, action) => {
  if (action.type === 'USER/SET_USERS') {
    return {
      ...state,
      users: action.data
    }
  }
  return state
}