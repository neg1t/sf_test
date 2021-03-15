import { combineReducers } from "redux"
import chequesReducers from './cheques-reducers.js'


const myApp = combineReducers({
  chequesReducers
})

export default myApp