import notFound from '../assets/img/404.png';

const NotFound = () => (
  <div className="not-found d-flex container justify-content-center align-items-center">
    <img src={notFound} alt="404" />
  </div>
);

export default NotFound;
