import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Navbar from '../../components/navbar';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Navbar />
  </Provider>,
);

describe('Navbar Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the title text of the Navbar Component', () => {
    const page = component.find('.navbar');
    expect(page).toMatchSnapshot();
  });

  test('renders the title text of the Navbar Component', () => {
    const page = component.find('.brand');
    expect(page).toMatchSnapshot();
  });
});
