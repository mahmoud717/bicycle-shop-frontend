/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn, userName, userId }) => (
  <nav className="navbar color-white mb-0 ">
    <div className="container-fluid">
      <div className="d-flex align-items-center nav-left">
        <Link to="/" className="mb-0 brand">Bicycle Shop</Link>
      </div>
      <div className="nav-right ">
        <Link to="/about">
          About
        </Link>
        {userName ? (
          <Link to={`/users/${userId}`}>
            {userName.charAt(0).toUpperCase() + userName.slice(1)}
          </Link>
        ) : '' }

        { loggedIn ? (<Link to="/logout">Logout</Link>) : (<Link to="/login">Login</Link>)}
      </div>
    </div>
  </nav>
);

export default Navbar;
