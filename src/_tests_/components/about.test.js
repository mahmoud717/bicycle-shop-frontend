import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import About from '../../components/about';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <About />
  </Provider>,
);

describe('About Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the title text of the About Component', () => {
    const page = component.find('.about');
    expect(page).toMatchSnapshot();
  });
});
