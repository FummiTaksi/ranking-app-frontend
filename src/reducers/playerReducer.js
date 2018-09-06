import playerService from '../services/playerService';
import { dispatchNotification } from './notificationReducer';

const initialState = {
  players: [], selectedPlayer: undefined, loading: false, error: false,
};

const typeIsLoading = type => type === 'GETTING_PLAYERS' || type === 'GETTING_PLAYER';

const typeIsError = type => type === 'GET_PLAYERS_FAILURE' || type === 'GET_PLAYER_FAILURE';

const reducer = (store = initialState, action) => {
  if (typeIsLoading(action.type)) {
    const newState = { ...store, loading: true, error: false };
    return newState;
  }
  if (action.type === 'GET_PLAYERS_SUCCESS') {
    const newState = {
      ...store, players: action.content.players, loading: false, error: false,
    };
    return newState;
  }
  if (action.type === 'GET_PLAYER_SUCCESS') {
    const newState = {
      ...store, selectedPlayer: action.content.player, loading: false, error: false,
    };
    return newState;
  }
  if (typeIsError(action.type)) {
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
    const header = 'Error while fetching players';
    const content = 'Try again later';
    const icon = 'thumbs down';
    dispatch({
      type: 'GET_PLAYERS_FAILURE',
    });
    dispatchNotification(dispatch, { header, content, icon });
  }
};


export const getPlayer = id => async (dispatch) => {
  try {
    dispatch({
      type: 'GETTING_PLAYER',
    });
    const response = await playerService.getPlayer(id);
    const header = `Player ${response.player.name} fetched successfully!`;
    const content = '';
    const icon = 'list ul';
    dispatch({
      type: 'GET_PLAYER_SUCCESS',
      content: response,
    });
    dispatchNotification(dispatch, { header, content, icon });
  } catch (error) {
    const header = 'Error while fetching player';
    const content = 'Try again later';
    const icon = 'thumbs down';
    dispatch({
      type: 'GET_PLAYER_FAILURE',
    });
    dispatchNotification(dispatch, { header, content, icon });
  }
};
export default reducer;
