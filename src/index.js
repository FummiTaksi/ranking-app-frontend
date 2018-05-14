import React from 'react';
import ReactDOM from 'react-dom';
import RankingApp from './components/RankingApp';
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.render(
<Provider store = { store }>
  <RankingApp />
</Provider>,
 document.getElementById('root')
);
