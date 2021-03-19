/* eslint-disable array-callback-return */
import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const UserFavorites = () => {
  const { id } = useParams();
  //   const history = useHistory();
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/v1/users/${id}/favourites`)
      .then(response => {
        setFavorites(response.data);
      });
  }, []);
  if (!favorites.length) {
    return (
      <h1 className="text-center mt-5">There are no favourites</h1>
    );
  }
  return (
    <div className="container-fluid order-card-container d-flex flex-column justify-content-center align-items-center">
      {favorites.map(bike => (
        <Link to={`/bicycles/${bike.id}`} key={bike.id}>
          <div className="order-card d-flex">
            <div className="order-card-image">
              <img src={bike.image_url} alt="" className="w-100" />
            </div>
            <div className="order-card-details">
              <div className="order-card-name">{bike.name}</div>
              <div className="order-card-data">{bike.created_at}</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default UserFavorites;
