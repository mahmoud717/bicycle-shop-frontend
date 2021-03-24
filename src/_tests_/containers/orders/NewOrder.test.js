import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import NewOrder from '../../../containers/orders/NewOrder';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <NewOrder />
  </Provider>,
);

describe('new order Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the new order container', () => {
    const page = component.find('.new-order');
    expect(page).toMatchSnapshot();
  });
});
