import { CHANGE_LOGGED_USER } from './auth_actions_types';

const changeLoggedUser = (user, loggedIn, userOrders) => ({
  type: CHANGE_LOGGED_USER,
  payload: {
    user,
    loggedIn,
    userOrders,
  },
});

export default changeLoggedUser;
