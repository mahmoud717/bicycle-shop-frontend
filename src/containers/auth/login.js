/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import changeLoggedUser from '../../redux/actions/auth_actions';

const Login = ({ authData, changeLoggedUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/sessions', {
      password,
      email,
    }, { withCredentials: true })
      .then(response => {
        console.log(response, authData);
        if (response.data.status === 'error') {
          /// handleError()
        }
        if (response.data.status === 'created') {
          changeLoggedUser(response.data.user, response.data.logged_in, response.data.orders);
          history.push('/');
        }
      })
      .catch(error => {
        console.log(error);
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
        <button className="btn btn-primary btn-ghost" type="submit">Login</button>

        <Link to="/signup" className="mt-3">
          Create account?
        </Link>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  authData: state.auth,
});

const mapDispatchToProps = dispatch => ({
  changeLoggedUser:
  (user, loggedIn, userOrders) => dispatch(changeLoggedUser(user, loggedIn, userOrders)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
