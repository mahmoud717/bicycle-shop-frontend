/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */

import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import changeLoggedUser from '../redux/actions/auth_actions';
import Router from './Router';
import '../index.css';

function App({ changeLoggedUser }) {
  useEffect(() => {
    axios.get('https://bicycle-shop-backend.herokuapp.com/api/v1/sessions/logged_in', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (response.data) {
          changeLoggedUser(response.data.user, response.data.logged_in, response.data.orders, false);
        }
      });
  }, []);

  return (
    <Router />
  );
}

const mapDispatchToProps = dispatch => ({
  changeLoggedUser:
  (user, loggedIn, userOrders, loading) => dispatch(changeLoggedUser(user, loggedIn, userOrders, loading)),
});

App.propTypes = {
  changeLoggedUser: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(App);
