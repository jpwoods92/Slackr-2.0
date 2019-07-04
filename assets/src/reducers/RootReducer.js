
import { combineReducers } from 'redux';

const appReducer = combineReducers({
  // entities,
  // session,
  // ui,
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
