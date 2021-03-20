/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from 'react-router-dom';

const Navbar = ({ loggedIn, userName, userId }) => (
  <nav className="navbar color-white mb-0 navbar-expand-md ">
    <div className="d-flex align-items-center nav-left navbar-brand">
      <Link to="/" className="mb-0 brand">Bicycle Shop</Link>
    </div>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon d-flex justify-content-center align-items-center"><i className="fas fa-bars fa-2x" /></span>
    </button>
    <div className="collapse navbar-collapse ml-auto d-md-flex justify-content-end" id="navbarSupportedContent">
      <ul className="navbar-nav ">
        <li className="nav-item">
          <Link to="/about">
            About
          </Link>

        </li>
        <li className="nav-item">
          {userName ? (
            <Link to={`/users/${userId}`}>
              {userName.charAt(0).toUpperCase() + userName.slice(1)}
            </Link>
          ) : '' }

        </li>

        { loggedIn ? (<li className="nav-item"><Link to="/logout">Logout</Link></li>) : (<li className="nav-item"><Link to="/login">Login</Link></li>)}

      </ul>
    </div>

  </nav>
);

export default Navbar;
