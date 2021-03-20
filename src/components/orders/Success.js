import React from 'react';
import { useHistory } from 'react-router-dom';

const Success = () => {
  const history = useHistory();
  const redirect = () => {
    setTimeout(() => {
      history.push('/');
    }, 5000);
  };
  return (
    <div className="order-success">
      <h1>Your order is created successfully</h1>
      <h3>You will be redirected to the home page in 5 seconds</h3>
      {redirect()}
    </div>
  );
};
export default Success;
