import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Signup from '../../../containers/auth/sign_up';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Signup />
  </Provider>,
);

describe('Signup Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the Signup Component', () => {
    const page = component.find('.signup');
    expect(page).toMatchSnapshot();
  });
});
