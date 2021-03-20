import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from '../../containers/App';

const mockStore = configureMockStore();
const store = mockStore({});
const setup = () => shallow(
  <Provider store={store}>
    <App />
  </Provider>,
);

describe('App Component', () => {
  let component;
  beforeEach(() => {
    component = setup();
  });

  test('renders the page', () => {
    const page = component.find('.App');
    expect(page).toMatchSnapshot();
  });

  test('renders the login-access class', () => {
    const text = component.find('.login-access');
    expect(text).toMatchSnapshot();
  });

  test('renders the the route-trackings class', () => {
    const text = component.find('.route-trackings');
    expect(text).toMatchSnapshot();
  });
});
