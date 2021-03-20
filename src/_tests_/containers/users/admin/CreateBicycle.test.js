import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import CreateBicycle from '../../../../containers/users/admin/CreateBicycle';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <CreateBicycle />
  </Provider>,
);

describe('create bicycle Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the create bicycle container', () => {
    const page = component.find('.bicycle-form-container');
    expect(page).toMatchSnapshot();
  });
});
