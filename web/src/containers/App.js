import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'

import Header from '../components/Header'

import Login from '../components/Login'
import AuthService from '../components/AuthService';
import history from '../history'
import Home  from '../containers/Home';

const auth = new AuthService()


class App extends Component {
  render() {
    return (
        <Router history={history} component={Header}>
          <section className="is-medium"><br/><br/><br/><br/>
            {/* <div className="hero-body"> */}
              <div className="container">
                  <Route path="/" render={(props) => 
                      <Header auth={auth} {...props}/>}/>

                  <Route path="/home" render={(props) => 
                      <Home auth={auth} {...props}/>}/>
                  
                  <Route path="/login" render={() =>
                      <Login auth={auth}/>}/>
              </div>
            {/* </div> */}
          </section>
        </Router>
    )
  }
}

export default App