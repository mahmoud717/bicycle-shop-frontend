import authReducer from '../../redux/reducers/auth_reducer';
import changeLoggedUser from '../../redux/actions/auth_actions';
import changeUserOrders from '../../redux/actions/order_actions';

describe('Book Reducer', () => {
  it('Should return the default state', () => {
    const state = authReducer({}, { type: 'action' });
    expect(state).toEqual({});
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = changeLoggedUser('Action');
    const state = authReducer(undefined, action);
    expect(state).toEqual({
      loading: undefined, loggedIn: undefined, user: 'Action', userOrders: undefined,
    });
  });

  it('Should return new state if a valid filter is provided', () => {
    const action = changeUserOrders({ order: {} });
    const state = authReducer(undefined, action);
    expect(state).toEqual(
      {
        loading: true,
        loggedIn: false,
        user: {},
        userOrders: {
          order: {},
        },
      },
    );
  });
});
