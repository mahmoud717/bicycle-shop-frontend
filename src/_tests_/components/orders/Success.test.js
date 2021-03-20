import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Success from '../../../components/orders/Success';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Success />
  </Provider>,
);

describe('Success Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the h1 text of the Success Component', () => {
    const page = component.find('.order-success');
    expect(page).toMatchSnapshot();
  });
});
