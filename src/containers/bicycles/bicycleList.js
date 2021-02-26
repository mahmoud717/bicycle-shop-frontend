/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react';

// import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BicycleList() {
  const [list, changeList] = useState({});
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/bicycles')
      .then(response => {
        if (response.data) {
          changeList(response.data);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  if (Object.keys(list).length === 0) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="container bicycle-list-container">
      <div className="bicycle-list d-flex row">
        {list.map(el => (
          <div className="bicycle col-4">
            <Link to={`bicycles/${el.id}`}>
              <div className="bicycle-card">
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
}
