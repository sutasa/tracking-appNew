import React, { Component } from 'react'
import { Route, Router, Switch} from 'react-router-dom'

import Header from '../components/Header'

import Login from '../components/Login'
import AuthService from '../components/AuthService';
import history from '../history'
import Home  from '../containers/Home';
import register from '../components/register';
const auth = new AuthService()


class App extends Component {
  render() {
    return (
        <Router history={history} component={Header} >
          <section className="is-medium"><br/><br/><br/>
            {/* <div className="hero-body"> */}
              <div className="container">
                <Switch>
                  <Route exect path="/register" component={register}/>
                </Switch>
                  <Route path="/login" render={(props) => 
                      <Login auth={auth} {...props}/>}/>

                  <Route path="/" render={(props) => 
                      <Header auth={auth} {...props}/>}/>

                  <Route path="/home" render={(props) => 
                      <Home auth={auth} {...props}/>}/>
          
              </div>
            {/* </div> */}
          </section>
        </Router>
    )
  }
}

export default App