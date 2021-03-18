import { CHANGE_USER_ORDERS } from './order_actions_types';

const changeUserOrders = orders => ({
  type: CHANGE_USER_ORDERS,
  payload: orders,
});

export default changeUserOrders;
