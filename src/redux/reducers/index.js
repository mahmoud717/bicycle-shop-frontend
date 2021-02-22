import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
});

export default rootReducer;
