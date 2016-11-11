import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

import App from './app';
import store from './store';
import DevTools from './devtools';

ReactDOM.render(
  <Provider store={store}>
    <div>
      <App />
      <DevTools />
    </div>
  </Provider>,

  document.getElementById('example')
);
