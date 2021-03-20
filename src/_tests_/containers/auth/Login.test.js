import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Login from '../../../containers/auth/login';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Login />
  </Provider>,
);

describe('Login Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the bicycle list Component', () => {
    const page = component.find('.bicycle-list-container');
    expect(page).toMatchSnapshot();
  });
});
