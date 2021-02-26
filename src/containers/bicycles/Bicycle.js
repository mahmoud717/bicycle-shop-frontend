/* eslint-disable react/prop-types */
import { useParams, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Bicycle = ({ authData }) => {
  const history = useHistory();
  const { id } = useParams();
  const [bicycle, changeBicycle] = useState({});
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/bicycles/${id}`)
      .then(response => {
        if (response.data) {
          changeBicycle(response.data);
          console.log(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

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
        </div>
      </div>
    </div>

  );
};

export default Bicycle;
