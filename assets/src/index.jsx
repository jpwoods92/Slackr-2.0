import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';

import App from './App';

const MOUNT_NODE = document.getElementById('root');

const render = Comp => {
  ReactDOM.render(
        <AppContainer>
          <Comp/>
        </AppContainer>,
        MOUNT_NODE
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => { render(App); });
}

