import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div>
        Simple Sails-React starter
    </div>
  );
};

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
  module.hot.accept('./containers/app', () => { render(App); });
}

