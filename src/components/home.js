import { Link } from 'react-router-dom';
import bicycle from '../assets/img/bicycle.png';

const Home = () => (
  <div className="d-flex justify-content-center align-items-center ">
    <img src={bicycle} alt="" />
    <div className="homepage-text ">
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
