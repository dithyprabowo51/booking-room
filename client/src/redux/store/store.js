import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'

// Reducers
import { roomReducer } from '../reducers/roomReducer.js'

const rootReducer = combineReducers({
  room: roomReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))