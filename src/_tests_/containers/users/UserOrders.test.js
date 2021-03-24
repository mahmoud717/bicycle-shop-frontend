import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import UserOrders from '../../../containers/users/UserOrders';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <UserOrders />
  </Provider>,
);

describe('UserOrders Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the UserOrders container', () => {
    const page = component.find('.order-card-container');
    expect(page).toMatchSnapshot();
  });
});
