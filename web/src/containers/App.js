import React, { Component } from 'react'
import { Route, Router } from 'react-router-dom'

import Header from '../components/Header'

import Login from '../components/Login'
import AuthService from '../components/AuthService';
import history from '../history'
import About from './about';
import Home  from '../containers/Home';

const auth = new AuthService()


class App extends Component {
  render() {
    return (
      <div>
        {/* <Header /> */}
        <Router history={history} component={Header}>
        <div>
          <section className="section">
            <div className="hero-body">
              <div className="container">
              {/* <Switch> */}
                  <Route path="/" render={(props) => 
                      <Header auth={auth} {...props}/>}/>

                  <Route path="/home" render={(props) => 
                      <Home auth={auth} {...props}/>}/>

                  <Route path="/about" render={(props) => 
                      <About auth={auth} {...props}/>}/>
                  
                  <Route path="/login" render={() =>
                      <Login auth={auth}/>}/>
              {/* </Switch> */}
              </div>
            </div>
          </section>
        </div>
      </Router>
      </div>
    )
  }
}

export default App