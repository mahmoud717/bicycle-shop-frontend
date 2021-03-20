import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Bicycle from '../../../containers/bicycles/Bicycle';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <Bicycle />
  </Provider>,
);

describe('Bicycle Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the Bicycle container', () => {
    const page = component.find('.bicycle-container');
    expect(page).toMatchSnapshot();
  });
});
