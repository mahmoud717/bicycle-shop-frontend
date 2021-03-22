import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import changeLoggedUser from '../../redux/actions/auth_actions';

const Logout = ({ changeLoggedUser }) => {
  const history = useHistory();
  axios.delete('https://bicycle-shop-backend.herokuapp.com/api/v1/sessions/logout')
    .then(response => {
      if (response.data) {
        changeLoggedUser({}, false, {});
        localStorage.clear();
        history.push('/');
      }
    })
    .catch(() => {
      history.push('/404');
    });
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

Logout.propTypes = {
  changeLoggedUser: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Logout);
