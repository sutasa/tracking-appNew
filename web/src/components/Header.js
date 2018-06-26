import React, { Component } from 'react'
import AuthService from './AuthService'
const Auth = new AuthService();

export class Header extends Component {
  handleLogout(){
      Auth.logout()
      this.props.history.replace('/')
  }

  hendelClickregister(){
    window.location = "http://localhost:3000/register"
  }

  render() {
    const style = {
      "color" : "#00aeef"
    }
    const { isAuthenticated } = this.props.auth
    return (
        <div>
            <nav className="navbar is-fixed-top is-light" aria-label="main navigation">
              <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" style={style} href={isAuthenticated()? "/home" : "/"}><strong>TRACKING</strong></a>
                    <div className="navbar-burger">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-start">
                    </div>
                    <div className="navbar-end">    
                      {
                          !isAuthenticated() && (
                            <div className="navbar-item">
                              <a className="button is-info" href="/login">Sign in</a> 
                              &nbsp;&nbsp;
                              <a className="button is-success" onClick={this.hendelClickregister.bind(this)}>Sign up</a>
                            </div>  
                          )
                        }                
                        {
                          isAuthenticated() && (
                            <div className="navbar-item">
                              <a className="button is-danger" onClick={this.handleLogout.bind(this)}>Sign out</a> 
                            </div>  
                          )
                        }
                      </div>
                    </div>
                </div>
            </nav>
            {/* {
              !isAuthenticated() && (
                      <Login/>
              )
            } */}
      </div>
         
      )
  }
}

export default (Header)