import notificationReducer from './reducers/notificationReducer'
import loginReducer from './reducers/loginReducer'
import rankingReducer from './reducers/rankingReducer'
import { tokenChanger} from './services/rankingService'
import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    notification: notificationReducer,
    login: loginReducer,
    ranking: rankingReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk, tokenChanger)
)

export default store