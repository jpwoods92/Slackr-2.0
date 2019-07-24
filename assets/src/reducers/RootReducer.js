import { combineReducers } from 'redux';
import { LOGOUT_SUCCEEDED } from '../actions/auth/SessionActions';
// import entities from './EntitiesReducer';
import session from './SessionReducer';
// import ui from './UiReducer';

const appReducer = combineReducers({
  // entities,
  session,
  // ui,
});

const rootReducer = (state, action) => {
  let newState;
  if (action.type === LOGOUT_SUCCEEDED) {
    newState = undefined;
  } else {
    newState = Object.assign({}, state);
  }
  return appReducer(newState, action);
};

export default rootReducer;
