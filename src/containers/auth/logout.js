/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import changeLoggedUser from '../../redux/actions/auth_actions';

const Logout = ({ changeLoggedUser }) => {
  const history = useHistory();
  axios.delete('http://localhost:5000/api/v1/sessions/logout')
    .then(response => {
      if (response.data) {
        changeLoggedUser({}, false, {});
        localStorage.clear();
        history.push('/');
      }
    });
  // .catch(error => {
  //   console.log(error);
  // });
  return (
    <div className="my-5 py-5 text-center">
      <h1>
        logging out
      </h1>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  changeLoggedUser:
    (user, loggedIn, userOrders) => dispatch(changeLoggedUser(user, loggedIn, userOrders)),
});
export default connect(null, mapDispatchToProps)(Logout);
