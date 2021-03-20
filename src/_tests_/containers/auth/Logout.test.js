import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Logout from '../../../containers/auth/logout';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Logout />
  </Provider>,
);

describe('logout Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the logout Component', () => {
    const page = component.find('.logout');
    expect(page).toMatchSnapshot();
  });
});
