import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// Reducers
import { roomReducer } from '../reducers/roomReducer.js'
import { bookingReducer } from '../reducers/bookingReducer.js'
import { userReducer } from '../reducers/userReducer.js'

const rootReducer = combineReducers({
  room: roomReducer,
  booking: bookingReducer,
  user: userReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))