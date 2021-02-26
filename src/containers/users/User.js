/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const User = ({ authData }) => {
  const history = useHistory();

  useEffect(() => {
    if (!authData.loggedIn) {
      history.push('/');
    }
  }, []);

  const handleClick = () => {
    history.push(`/users/${authData.user.id}/orders`);
  };
  return (
    <div className="user-container container my-5">
      <div className="user-info d-flex justify-content-center align-items-center flex-column">
        <div className="user-image">
          { authData.user.image_url ? <img src={`${authData.user.image_url}?s=512`} className="w-100" alt="user" /> : <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" className="w-100" alt="user" /> }

        </div>
        <div className="user-name">
          {authData.user.name.charAt(0).toUpperCase() + authData.user.name.slice(1)}
        </div>
        <div className="user-email">
          {authData.user.email}
        </div>
        <button type="button" className="btn btn-primary mt-5" onClick={handleClick}>
          orders
        </button>
      </div>

    </div>
  );
};

export default User;
