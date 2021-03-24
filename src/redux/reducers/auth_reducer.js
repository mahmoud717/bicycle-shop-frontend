import { CHANGE_LOGGED_USER } from '../actions/auth_actions_types';
import { CHANGE_USER_ORDERS } from '../actions/order_actions_types';

const initialState = {
  loggedIn: false,
  user: {},
  userOrders: {},
  loading: true,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LOGGED_USER:
      return {
        user: action.payload.user,
        loggedIn: action.payload.loggedIn,
        userOrders: action.payload.userOrders,
        loading: action.payload.loading,
      };
    case CHANGE_USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload,
      };
    default: return state;
  }
};

export default AuthReducer;
