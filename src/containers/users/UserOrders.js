/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const UserOrders = ({ authData }) => {
  if (!authData || authData.loading) {
    return (
      <h1 className="text-center">loading</h1>
    );
  }
  if (authData && !authData.loading && !authData.userOrders.length) {
    return (
      <div className="text-center mt-5 pt-5">
        <div className="no-orders">You don&apos;t have any orders, Make A purchase to make it appear here. </div>
        {authData.user.admin === true ? <Link to="/bicycles/create" className="btn btn-success mt-5">Add product</Link> : ''}
      </div>

    );
  }
  return (
    <div className="container-fluid order-card-container d-flex flex-column justify-content-center align-items-center">

      {authData.userOrders.map(order => (
        <div key={order.id} className="order-card d-flex">
          <div className="order-card-image">
            <img src={order.product_image_url} alt="" className="w-100" />
          </div>
          <div className="order-card-details">
            <div className="order-card-name">{order.product_name}</div>
            <div className="order-card-data">{order.created_at}</div>
          </div>

        </div>

      ))}
    </div>
  );
};

UserOrders.propTypes = {
  authData: PropTypes.object.isRequired,
};

export default UserOrders;
