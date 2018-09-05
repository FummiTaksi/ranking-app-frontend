import playerService from '../services/playerService';
import { dispatchNotification } from './notificationReducer';

const initialState = { players: [], loading: false, error: false };

const reducer = (store = initialState, action) => {
  if (action.type === 'GETTING_PLAYERS') {
    const newState = { ...store, loading: true, error: false };
    return newState;
  }
  if (action.type === 'GET_PLAYERS_SUCCESS') {
    const newState = {
      ...store, players: action.content.players, loading: false, error: false,
    };
    return newState;
  }
  if (action.type === 'GET_PLAYERS_FAILURE') {
    const newState = { ...store, loading: false, error: true };
    return newState;
  }
  return store;
};


export const getPlayers = () => async (dispatch) => {
  try {
    dispatch({
      type: 'GETTING_PLAYERS',
    });
    const response = await playerService.getPlayers();
    const header = 'Players fetched successfully!';
    const content = '';
    const icon = 'list ul';
    dispatch({
      type: 'GET_PLAYERS_SUCCESS',
      content: response,
    });
    dispatchNotification(dispatch, { header, content, icon });
  } catch (error) {
    console.log('error', error);
    const header = 'Error while fetching players';
    const content = 'Try again later';
    const icon = 'thumbs down';
    dispatch({
      type: 'GET_PLAYERS_FAILURE',
    });
    dispatchNotification(dispatch, { header, content, icon });
  }
};

export default reducer;
