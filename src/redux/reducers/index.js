import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import OptionsReducer from './options_reducer';

const rootReducer = combineReducers({
  auth: AuthReducer,
  options: OptionsReducer,
});

export default rootReducer;
