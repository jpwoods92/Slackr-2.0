
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import React from 'react';

import store from './store/Store';
import Router from './Router';

const App = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </Provider>
);
export default App;
