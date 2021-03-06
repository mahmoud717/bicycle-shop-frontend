/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */

import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import About from '../components/about';
import Navbar from '../components/navbar';
import NotFound from '../components/404';
import Home from '../components/home';
import '../index.css';
import Login from './auth/login';
import Logout from './auth/logout';
import Signup from './auth/sign_up';
import BicycleList from './bicycles/bicycleList';
import Bicycle from './bicycles/Bicycle';
import NewOrder from './orders/NewOrder';
import Success from '../components/orders/Success';
import User from './users/User';
import UserOrders from './users/UserOrders';
import CreateBicycle from './users/admin/CreateBicycle';
import AddOptions from './users/admin/addOptions';
import UserFavorites from './users/UserFavourites';

function Router({ authData }) {
  return (
    <BrowserRouter>
      <Navbar loggedIn={authData.loggedIn} userName={authData.user.name} userId={authData.user.id} />
      <div className="App m-0">
        <Switch>
          <Route exact path="/users/:id">
            <User authData={authData} />
          </Route>
          <Route exact path="/login">
            <Login authData={authData} />
          </Route>
          <Route exact path="/signup">
            <Signup authData={authData} />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/bicycles">
            <BicycleList authData={authData} />
          </Route>
          <Route exact path="/logout">
            <Logout authData={authData} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>

          <Route exact path="/bicycles/create">
            <CreateBicycle authData={authData} />
          </Route>
          <Route exact path="/bicycles/:id/addOptions">
            <AddOptions authData={authData} />
          </Route>
          <Route exact path="/bicycles/:id">
            <Bicycle authData={authData} />
          </Route>
          <Route exact path="/orders/success">
            <Success authData={authData} />
          </Route>
          <Route exact path="/orders/new/:id">
            <NewOrder authData={authData} />
          </Route>
          <Route exact path="/users/:id/orders">
            <UserOrders authData={authData} />
          </Route>
          <Route exact path="/users/:id/favorites">
            <UserFavorites authData={authData} />
          </Route>

          <Route exact path="*">
            <NotFound />
          </Route>

        </Switch>

      </div>

    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  authData: state.auth,
});

Router.propTypes = {
  authData: PropTypes.object.isRequired,
};
export default connect(mapStateToProps, null)(Router);
