import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import BicycleList from '../../../containers/bicycles/bicycleList';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <BicycleList />
  </Provider>,
);

describe('BicycleList Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the bicycle list Component', () => {
    const page = component.find('.bicycle-list-container');
    expect(page).toMatchSnapshot();
  });
});
