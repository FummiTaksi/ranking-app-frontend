import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import RankingApp from './components/RankingApp';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <RankingApp />
  </Provider>,
  document.getElementById('root'),
);
