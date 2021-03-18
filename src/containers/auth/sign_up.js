/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import axios from 'axios';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import changeLoggedUser from '../../redux/actions/auth_actions';

const Signup = ({ authData, changeLoggedUser }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const history = useHistory();
  if (authData.loggedIn === true) {
    history.push('/');
  }
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/v1/users', {
      name,
      password,
      email,
      image_url: imageUrl,
      password_confirmation: passwordConfirmation,
    })
      .then(response => {
        if (response.data.status === 'error') {
          /// handleError()
        } else {
          changeLoggedUser(response.data.user, true, []);
          localStorage.setItem('token', response.data.token);
          history.push('/');
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center form-container container pb-4">
      <form onSubmit={handleSubmit} className="login-form d-flex flex-column text-center mb-5">
        <h2 className="text-white">Signup</h2>
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

        <div className="form-input-material d-flex flex-column align-items-start">
          <label htmlFor="imageUrl">Image URL</label>
          <input type="text" id="imageUrl" name="imageUrl" className="form-control-material w-100" value={imageUrl} onChange={e => { setImageUrl(e.target.value); }} placeholder="Image URL" />
        </div>
        <button className="btn btn-primary btn-ghost" type="submit">Signup</button>
        <Link to="/login" className="mt-3">
          Login?
        </Link>
      </form>

    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  changeLoggedUser:
    (user, loggedIn, userOrders) => dispatch(changeLoggedUser(user, loggedIn, userOrders)),
});
export default connect(null, mapDispatchToProps)(Signup);
