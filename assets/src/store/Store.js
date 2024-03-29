import { createStore, applyMiddleware, compose } from 'redux';
import freeze from 'redux-freeze';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import RootReducer from '../reducers/RootReducer';

const middlewares = [thunk];

// Check for if running in production or not, and loads redux dev tools
// this will be changed if we use rails instead of node
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(freeze);
  middlewares.push(logger);
}

let middleware = applyMiddleware(...middlewares);

if (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  middleware = compose(
    middleware,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}

export default createStore(RootReducer, middleware);
