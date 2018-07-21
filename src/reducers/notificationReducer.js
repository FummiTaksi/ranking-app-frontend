const initialState = { icon: '', header: '', message: '' };

const reducer = (store = initialState, action) => {
  if (action.type === 'CHANGE_NOTIFICATION') {
    return action.message;
  }
  return store;
};

export const notificationChange = (message, time) => async (dispatch) => {
  dispatch({
    type: 'CHANGE_NOTIFICATION',
    message,
  });
  setTimeout(() => {
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      message: '',
    });
  }, time * 1000);
};

export const dispatchNotification = (dispatch, message) => {
  dispatch({
    type: 'CHANGE_NOTIFICATION',
    message,
  });
  setTimeout(() => {
    dispatch({
      type: 'CHANGE_NOTIFICATION',
      message: '',
    });
  }, 5 * 1000);
};

export default reducer;
