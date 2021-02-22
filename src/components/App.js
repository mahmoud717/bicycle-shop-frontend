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
      <Navbar loggedIn={authData.loggedIn} userName={authData.user.name} />
      <div className="App m-0">
        <Switch>

          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/bicycles">
            <BicycleList />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/about">
            <About />
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

const mapDispatchToProps = dispatch => ({
  changeLoggedUser:
  (user, loggedIn, userOrders) => dispatch(changeLoggedUser(user, loggedIn, userOrders)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
