import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import UserFavourites from '../../../containers/users/UserFavourites';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <UserFavourites />
  </Provider>,
);

describe('UserFavourites Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the UserFavourites container', () => {
    const page = component.find('.user-favourites');
    expect(page).toMatchSnapshot();
  });
});
