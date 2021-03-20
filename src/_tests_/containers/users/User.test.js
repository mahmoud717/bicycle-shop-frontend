import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import User from '../../../containers/users/User';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <User />
  </Provider>,
);

describe('User Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the User container', () => {
    const page = component.find('.user-container');
    expect(page).toMatchSnapshot();
  });
});
