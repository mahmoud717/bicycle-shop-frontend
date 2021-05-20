/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import loadingImg from '../../assets/img/loading.gif';

const BicycleList = ({ authData }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [list, changeList] = useState(null);
  useEffect(() => {
    axios.get('https://bicycle-shop-backend.herokuapp.com/api/v1/bicycles')
      .then(response => {
        if (response.data) {
          changeList(response.data.bicycles);
          setLoading(false);
        }
      })
      .catch(() => {
        history.pushState('/404');
      });
  }, []);
  if (loading) {
    return (
      <div className="h-100 w-100 justify-content-center align-items-center text-center mt-5"><img src={loadingImg} alt="loading" /></div>

    );
  }
  if (!authData.loading && list && Object.keys(list).length === 0) {
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
        {list && list.map(el => (
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
      <div className="d-flex justify-content-center">{authData.user.admin && <Link to="/bicycles/create" className="btn btn-success mt-3 mb-5 text-center">Add product</Link> }</div>
    </div>

  );
};

BicycleList.propTypes = {
  authData: PropTypes.object.isRequired,

};

export default BicycleList;
