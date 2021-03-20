import { Link } from 'react-router-dom';
import bicycle from '../assets/img/bicycle.png';

const Home = () => (
  <div className="d-flex flex-column flex-lg-row justify-content-center align-items-center px-3 ">
    <img src={bicycle} alt="" className="main-image" />
    <div className="homepage-text d-flex flex-column mt-4 mt-md-0 justify-content-center">
      <p>
        Explore a wide variety of
        <br />
        bicycles for every need.
      </p>
      <Link to="/bicycles" className="btn btn-primary">
        View All Bicycles
      </Link>

    </div>

  </div>
);

export default Home;
