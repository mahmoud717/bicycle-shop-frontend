import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Home from '../../components/home';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Home />
  </Provider>,
);

describe('Home Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the title text of the Home Component', () => {
    const page = component.find('.homepage-text');
    expect(page).toMatchSnapshot();
  });

  test('renders the title text of the Home Component', () => {
    const page = component.find('.main-image');
    expect(page).toMatchSnapshot();
  });
});
