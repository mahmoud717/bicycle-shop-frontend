import React from 'react';

import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import NotFound from '../../components/404';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <NotFound />
  </Provider>,
);

describe('404 Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });
  test('renders the title text of the 404 Component', () => {
    const page = component.find('.not-found');
    expect(page).toMatchSnapshot();
  });
});
