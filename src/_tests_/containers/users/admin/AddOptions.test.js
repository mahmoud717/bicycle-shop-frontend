import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import AddOptions from '../../../../containers/users/admin/addOptions';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <AddOptions />
  </Provider>,
);

describe('add options Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the add options container', () => {
    const page = component.find('.add-options');
    expect(page).toMatchSnapshot();
  });
});
