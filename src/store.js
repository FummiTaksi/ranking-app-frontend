import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import notificationReducer from './reducers/notificationReducer';
import loginReducer from './reducers/loginReducer';
import rankingReducer from './reducers/rankingReducer';
import playerReducer from './reducers/playerReducer';
import { tokenChanger } from './services/rankingService';


const reducer = combineReducers({
  notification: notificationReducer,
  login: loginReducer,
  ranking: rankingReducer,
  player: playerReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk, tokenChanger),
);

export default store;
