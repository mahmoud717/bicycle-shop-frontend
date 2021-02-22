import { CHANGE_LOGGED_USER } from '../actions/auth_actions_types';

const initialState = {
  loggedIn: false,
  user: {},
  userOrders: {},
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOGGED_USER:
      return {
        user: action.payload.user,
        loggedIn: action.payload.loggedIn,
        userOrders: action.payload.userOrders,
      };
    default: return state;
  }
};

export default AuthReducer;
