import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducers from './reducers'
import RouterMap from './routes/index.js'

let store = createStore(reducers)
ReactDOM.render(
  <Provider store={store}>
    <RouterMap/>
  </Provider>,
  document.getElementById('root')
);
