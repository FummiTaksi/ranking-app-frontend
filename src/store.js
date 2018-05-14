import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    notification: notificationReducer,
    login: loginReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

export default store