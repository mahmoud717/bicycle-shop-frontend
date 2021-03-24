/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */

import { useParams, useHistory, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Bicycle = ({ authData }) => {
  const history = useHistory();
  const { id } = useParams();
  const [bicycle, changeBicycle] = useState({});
  const [favValue, setFavValue] = useState('far fa-star');
  const [count, setCount] = useState(0);
  // fetch bike data

  useEffect(() => {
    axios.get(`https://bicycle-shop-backend.herokuapp.com/api/v1/bicycles/${id}`)
      .then(response => {
        if (response.data) {
          changeBicycle(response.data.bicycle);
        }
      })
      .catch(() => {
        history.push('/404');
      });
  }, []);

  if (!count) {
    if (authData.user.id) {
      setCount(1);
      axios.get(`https://bicycle-shop-backend.herokuapp.com/api/v1/users/${authData.user.id}/favourites/${id}`)
        .then(response => {
          if (response.data.status) {
            setFavValue('fas fa-star');
          }
        });
    }
  }

  const handelDeletion = e => {
    e.preventDefault();
    if (confirm('Are you sure you want to delete this bike?')) {
      axios.delete(`https://bicycle-shop-backend.herokuapp.com/api/v1/bicycles/${id}`)
        .then(response => {
          if (response.data.status === 'success') {
            history.push('/bicycles');
          }
        });
    }
  };

  // check if user is logged in
  const handleClick = e => {
    e.preventDefault();
    if (authData.loggedIn) {
      history.push(`/orders/new/${id}`);
    }
    if (!authData.loggedIn) {
      history.push('/login');
    }
  };

  const handleFavorite = e => {
    e.preventDefault();
    if (!authData.loggedIn) {
      history.push('/login');
    }
    if (favValue === 'far fa-star') {
      axios.post(`https://bicycle-shop-backend.herokuapp.com/api/v1/users/${authData.user.id}/favourites`, {
        bicycle_id: id,
      })
        .then(() => {
          setFavValue('fas fa-star');
        });
    } else {
      axios.delete(`https://bicycle-shop-backend.herokuapp.com/api/v1/users/${authData.user.id}/favourites/${id}`)
        .then(() => {
          setFavValue('far fa-star');
        });
    }
  };
  if (authData.loading) {
    return (
      <h1 className="text-center">loading</h1>
    );
  }
  return (
    <div className="container-fluid pb-5">
      <div className="bicycle-container container d-flex flex-column justify-content-center align-items-center mb-5">
        <div className="bicycle-container-image">
          <div className="bicycle-container-model btn btn-outline-primary">{bicycle.model}</div>
          <button type="button" className="btn star-btn" onClick={handleFavorite}>
            <i className={`${favValue} star fa-2x`} />
          </button>
          <img src={bicycle.image_url} alt="" className="w-100" />
        </div>
        <div className="bicycle-container-name">{bicycle.name}</div>
        <div className="bicycle-container-description">{bicycle.description}</div>

        <div>
          <button type="button" onClick={handleClick} className="btn btn-primary">
            Order Now
          </button>
          {authData.user.admin && <Link to={`/bicycles/${id}/addOptions`} className="btn btn-success m-3">Add Options</Link>}
        </div>
        {authData.user.admin && (
        <div>
          <button type="button" className="btn btn-danger" onClick={handelDeletion}>
            Delete Bike
          </button>
        </div>
        )}

      </div>
    </div>

  );
};

Bicycle.propTypes = {
  authData: PropTypes.object.isRequired,
};

export default Bicycle;
