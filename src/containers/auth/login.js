/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import changeLoggedUser from '../../redux/actions/auth_actions';

const Login = ({ authData, changeLoggedUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();
  if (authData.loggedIn === true) {
    history.push('/');
  }
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://bicycle-shop-backend.herokuapp.com/api/v1/sessions', {
      password,
      email,
    })
      .then(response => {
        if (response.data.status === 404) {
          setError('incorrect email or password');
        }
        if (response.data.status === 'created') {
          changeLoggedUser(response.data.user, response.data.logged_in, response.data.orders);
          localStorage.setItem('token', response.data.token);
          history.push('/');
        }
      })
      .catch(() => {
        history.pushState('/404');
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center form-container container">
      <form onSubmit={handleSubmit} className="login-form d-flex flex-column text-center">
        <h2 className="text-white">Login</h2>
        <div className="form-input-material d-flex flex-column align-items-start">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="form-control-material w-100" value={email} onChange={e => { setEmail(e.target.value); }} required placeholder="Enter your email." />
        </div>
        <div className="form-input-material d-flex flex-column align-items-start">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-control-material w-100" value={password} onChange={e => { setPassword(e.target.value); }} required placeholder="Enter a password" />
        </div>

        <div className="text-white mt-1">{error}</div>
        <button className="btn btn-primary btn-ghost" type="submit">Login</button>

        <Link to="/signup" className="mt-3">
          Create account?
        </Link>
      </form>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  changeLoggedUser:
  (user, loggedIn, userOrders) => dispatch(changeLoggedUser(user, loggedIn, userOrders)),
});

Login.propTypes = {
  authData: PropTypes.object.isRequired,
  changeLoggedUser: PropTypes.func.isRequired,
};
export default connect(null, mapDispatchToProps)(Login);
