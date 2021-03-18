/* eslint-disable array-callback-return */
import { React, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const UserFavorites = () => {
  const { id } = useParams();
  //   const history = useHistory();
  const [favorites, setFavorites] = useState([]);
  useEffect(() => {
    axios.get(`localhost:5000/api/v1/users/${id}/favorites`)
      .then(response => {
        setFavorites(response.data);
      });
  }, []);
  return (
    <div>
      {favorites.map(bike => (
        <div key={bike.id} className="order-card d-flex">
          <Link to={`/bicycles/${bike.id}`}>
            <div className="order-card-image">
              <img src={bike.product_image_url} alt="" className="w-100" />
            </div>
            <div className="order-card-details">
              <div className="order-card-name">{bike.product_name}</div>
              <div className="order-card-data">{bike.created_at}</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default UserFavorites;
