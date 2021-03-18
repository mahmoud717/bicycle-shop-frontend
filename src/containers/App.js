/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import {
  BrowserRouter, Route, Switch,
} from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import changeLoggedUser from '../redux/actions/auth_actions';
import About from '../components/about';
import Navbar from '../components/navbar';
import NotFound from '../components/404';
import Home from '../components/home';
import '../index.css';
import Login from './auth/login';
import Logout from './auth/logout';
import Signup from './auth/sign_up';
import BicycleList from '../components/bicycles/bicycleList';
import Bicycle from '../components/bicycles/Bicycle';
import NewOrder from './orders/NewOrder';
import Success from '../components/orders/Success';
import User from './users/User';
import UserOrders from './users/UserOrders';
import CreateBicycle from './users/admin/CreateBicycle';
import AddOptions from './users/admin/addOptions';

function App({ authData, changeLoggedUser }) {
  useEffect(() => {
    axios.get('https://bicycle-shop-backend.herokuapp.com/api/v1/sessions/logged_in', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(response => {
        if (response.data) {
          changeLoggedUser(response.data.user, response.data.logged_in, response.data.orders, false);
          console.log(response.data);
        }
      });
    // .catch(error => {
    //   console.error(error);
    // });
  }, []);

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
            <Home authData={authData} />
          </Route>
          <Route exact path="/bicycles">
            <BicycleList authData={authData} />
          </Route>
          <Route exact path="/logout">
            <Logout authData={authData} />
          </Route>
          <Route exact path="/about">
            <About authData={authData} />
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
          <Route exact path="*">
            <NotFound authData={authData} />
          </Route>

        </Switch>

      </div>

    </BrowserRouter>
  );
}

const mapStateToProps = state => ({
  authData: state.auth,
});

const mapDispatchToProps = dispatch => ({
  changeLoggedUser:
  (user, loggedIn, userOrders, loading) => dispatch(changeLoggedUser(user, loggedIn, userOrders, loading)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
