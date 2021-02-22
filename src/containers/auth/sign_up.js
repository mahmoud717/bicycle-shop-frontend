/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import changeLoggedUser from '../../redux/actions/auth_actions';

const Signup = ({ changeLoggedUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/users', {
      name,
      password,
      email,
      password_confirmation: passwordConfirmation,
    }, { withCredentials: true })
      .then(response => {
        if (response.data.status === 'error') {
          /// handleError()
        } else {
          changeLoggedUser(response.data.user, response.data.logged_in, response.data.orders);
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
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" className="form-control-material w-100" autoComplete="off" value={name} onChange={e => { setName(e.target.value); }} required placeholder="Name" />
        </div>
        <div className="form-input-material d-flex flex-column align-items-start">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="form-control-material w-100" autoComplete="off" value={email} onChange={e => { setEmail(e.target.value); }} required placeholder="Enter your email." />
        </div>
        <div className="form-input-material d-flex flex-column align-items-start">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-control-material w-100" value={password} onChange={e => { setPassword(e.target.value); }} required placeholder="Enter a password" />
        </div>

        <div className="form-input-material d-flex flex-column align-items-start">
          <label htmlFor="passwordConfirmation">Password</label>
          <input type="password" id="passwordConfirmation" name="passwordConfirmation" className="form-control-material w-100" value={passwordConfirmation} onChange={e => { setPasswordConfirmation(e.target.value); }} required placeholder="Re-enter your password" />
        </div>
        <button className="btn btn-primary btn-ghost" type="submit">Login</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
