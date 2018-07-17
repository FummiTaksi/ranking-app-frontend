import loginReducer from '../reducers/loginReducer';

describe('loginReducer ', () => {
  const initialState = {
    username: undefined,
    admin: undefined,
    token: '',
  };
  it(' should return a proper initial state when called with undefined state', () => {
    const action = {
      type: 'DO_NOTHING',
    };
    const newState = loginReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
});
