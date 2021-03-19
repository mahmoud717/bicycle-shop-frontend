/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';

const UserOrders = ({ authData }) => {
  if (authData.loading) {
    return (
      <h1 className="text-center">loading</h1>
    );
  }
  return (
    <div className="container-fluid order-card-container d-flex flex-column justify-content-center align-items-center">
      {authData.loggedIn ? authData.userOrders.length === 0
        ? <div className="no-orders">You don&apos;t have any orders, Make A purchase to make it appear here. </div>
        : authData.userOrders.map(order => (
          <div key={order.id} className="order-card d-flex">
            <div className="order-card-image">
              <img src={order.product_image_url} alt="" className="w-100" />
            </div>
            <div className="order-card-details">
              <div className="order-card-name">{order.product_name}</div>
              <div className="order-card-data">{order.created_at}</div>
            </div>

          </div>

        )) : ''}
    </div>
  );
};

export default UserOrders;
