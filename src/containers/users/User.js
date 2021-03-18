/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import changeLoggedUser from '../../redux/actions/auth_actions';

const User = ({ authData, changeLoggedUser }) => {
  const history = useHistory();

  if (authData && !authData.loading && !authData.loggedIn) {
    history.push('/');
  }

  const handleClick = () => {
    history.push(`/users/${authData.user.id}/orders`);
  };

  const handelDeletion = e => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this Account?')) {
      axios.delete(`https://bicycle-shop-backend.herokuapp.com/api/v1/users/${authData.user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${localStorage.getItem('token')}`,
        },
      })
        .then(response => {
          if (response.data.status === 'success') {
            changeLoggedUser({}, false, {});
            localStorage.clear();
            history.push('/');
          }
        });
    }
  };
  if (!authData.loading) {
    return (
      <div className="user-container container my-5">
        <div className="user-info d-flex justify-content-center align-items-center flex-column">
          <div className="user-image">
            { authData.user.image_url ? <img src={`${authData.user.image_url}?s=512`} className="w-100" alt="user" /> : <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" className="w-100" alt="user" /> }

          </div>
          <div className="user-name">
            {authData.user.name && authData.user.name.charAt(0).toUpperCase() + authData.user.name.slice(1)}
          </div>
          <div className="user-email">
            {authData.user.email}
          </div>
          <div>
            <button type="button" className="btn btn-primary m-3" onClick={handleClick}>
              orders
            </button>
            {authData.user.admin === true ? <Link to="/bicycles/create" className="btn btn-success m-3">Add product</Link> : ''}

          </div>

          <button type="button" className="btn btn-danger " onClick={handelDeletion}>
            Delete account
          </button>
        </div>

      </div>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  changeLoggedUser:
  (user, loggedIn, userOrders, loading) => dispatch(changeLoggedUser(user, loggedIn, userOrders, loading)),
});

export default connect(null, mapDispatchToProps)(User);
