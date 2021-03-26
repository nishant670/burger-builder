import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

import { connect } from 'react-redux';
import * as authActions from './store/actions/auth';

import { Route, Switch, Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
});

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
        routes = (
          <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
          </Switch>
        );
    };

    return (
        <Layout>
          {routes}
        </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp : () => dispatch(authActions.authStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
