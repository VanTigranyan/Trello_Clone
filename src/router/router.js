import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import Service from '../redux/service';
import Login from "../Containers/auth/login";
import Register from "../Containers/auth/register";
import Header from "../components/header/header";
import Dashboard from "../Containers/dashboard/dashboard";
import Lists from '../Containers/lists/lists';
import { logOutAction } from '../redux/actions/auth.action';

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={(props) => (
    Service.isLoggedIn() ? <Component {...props} />
    : <Redirect exact
      to={{
        pathname: '/login',
        state: {from: props.location}
      }}
      />
  )}/>
);

const mapStatetoProps = state => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    user: state.authReducer.user
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    onLogOut: () => dispatch(logOutAction())
  }
}

class Router extends React.Component {

  render() {
    return (
    <BrowserRouter>
      <div style={{height: "100%", minWidth: "100%"}}>
        <Header isLoggedIn={this.props.isLoggedIn} logOut={this.props.onLogOut} user={this.props.user}/>
        <Switch>
          <Redirect exact from="/" to="/login"/>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PrivateRoute exact path="/board/:boardId" component={Lists}/>
        </Switch>
      </div>
    </BrowserRouter>
  )

  }
}



export default connect(mapStatetoProps, mapDispatchtoProps)(Router);
