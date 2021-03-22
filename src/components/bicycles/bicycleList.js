/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

const BicycleList = ({ authData }) => {
  const history = useHistory();
  const [list, changeList] = useState('');
  useEffect(() => {
    axios.get('https://bicycle-shop-backend.herokuapp.com/api/v1/bicycles')
      .then(response => {
        if (response.data) {
          changeList(response.data.bicycles);
        }
      })
      .catch(() => {
        history.push('/404');
      });
  }, []);
  if (authData.loading) {
    return (
      <h1 className="text-center">loading</h1>
    );
  }
  if (!authData.loading && Object.keys(list).length === 0) {
    return (
      <div className="text-center mt-5 pt-5">
        <h1 className="mt-5">There are no bikes at the moment, please come back later.</h1>
        {authData.user.admin === true ? <Link to="/bicycles/create" className="btn btn-success mt-5">Add product</Link> : ''}
      </div>

    );
  }
  return (
    <div className="container bicycle-list-container">
      <div className="bicycle-list d-flex row">
        {list.map(el => (
          <div key={el.name} className="bicycle col-lg-4 col-md-6 col-12">
            <Link to={`bicycles/${el.id}`}>
              <div className="bicycle-card d-flex flex-column">
                <div className="bicycle-image w-100">
                  <img src={el.image_url} alt="" className="" />
                </div>
                <div className="bicycle-name">{el.name}</div>
                <div className="bicycle-model btn btn-outline-primary">{el.model}</div>
                {el.description ? (<div className="bicycle-description">{`${el.description.substring(0, 100)}...`}</div>) : ''}
              </div>

            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

BicycleList.propTypes = {
  authData: PropTypes.object.isRequired,

};

export default BicycleList;
