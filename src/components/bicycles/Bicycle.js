/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prop-types */
import { useParams, useHistory, Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bicycle = ({ authData }) => {
  const history = useHistory();
  const { id } = useParams();
  const [bicycle, changeBicycle] = useState({});

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
  return (
    <div className="container-fluid pb-5">
      <div className="bicycle-container container d-flex flex-column justify-content-center align-items-center mb-5">
        <div className="bicycle-container-image">
          <div className="bicycle-container-model btn btn-outline-primary">{bicycle.model}</div>
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

export default Bicycle;
