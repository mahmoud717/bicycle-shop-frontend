/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import changeLoggedUser from '../../redux/actions/auth_actions';

const Logout = ({ changeLoggedUser }) => {
  const history = useHistory();
  axios.delete('http://localhost:5000/api/v1/sessions/logout', { withCredentials: true })
    .then(response => {
      if (response.data) {
        changeLoggedUser({}, false, {});

        history.push('/');
      }
    })
    .catch(error => {
      console.log(error);
    });
  return (
    <h1>
      logging out
    </h1>
  );
};

const mapStateToProps = state => ({
  authData: state.auth,

});

const mapDispatchToProps = dispatch => ({
  changeLoggedUser:
    (user, loggedIn, userOrders) => dispatch(changeLoggedUser(user, loggedIn, userOrders)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
