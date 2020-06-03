import { createStore, combineReducers } from 'redux'

export const counterReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case 'ADD':
      return state + payload
    //如果state是对象
    // return {...state, ...newState};
    case 'MINUS':
      return state - payload
    default:
      return state
  }
}

export default createStore(combineReducers({ count: counterReducer }))
