import { createStore, combineReducers } from 'redux'
import { DataProgress } from './reducers/DataProgress'


const reducer = combineReducers({
  DataProgress
})

const storex = createStore(reducer)

export default storex