/* eslint-disable max-len */
/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import changeLoggedUser from '../redux/actions/auth_actions';
import About from './about';
import Navbar from './navbar';
import NotFound from './404';
import Home from './home';
import '../index.css';
import Login from '../containers/auth/login';
import Logout from '../containers/auth/logout';
import Signup from '../containers/auth/sign_up';
import BicycleList from '../containers/bicycles/bicycleList';
import Bicycle from '../containers/bicycles/Bicycle';
import NewOrder from '../containers/orders/NewOrder';
import Success from '../containers/orders/Success';
import User from '../containers/users/User';

function App({ authData, changeLoggedUser }) {
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/sessions/logged_in', { withCredentials: true })
      .then(response => {
        if (response.data) {
          changeLoggedUser(response.data.user, response.data.logged_in, response.data.orders);
        }
      })
      .catch(error => {
        console.error(error);
      });
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
          <Route exact path="/bicycles/:id">
            <Bicycle authData={authData} />
          </Route>
          <Route exact path="/orders/success">
            <Success authData={authData} />
          </Route>
          <Route exact path="/orders/new/:id">
            <NewOrder authData={authData} />
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
  (user, loggedIn, userOrders) => dispatch(changeLoggedUser(user, loggedIn, userOrders)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
