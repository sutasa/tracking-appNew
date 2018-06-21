import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import AuthService from './AuthService'
const Auth = new AuthService();

export class Header extends Component {
  handleLogout(){
      Auth.logout()
      this.props.history.replace('/login')
  }

  render() {
    const style = {
      "color" : "#00aeef"
    }
    const { isAuthenticated } = this.props.auth
    return (
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
                  <Link to="/home" className="navbar-item">Home</Link>
                </div>
                <div className="navbar-end">                    
                    {
                      !isAuthenticated() && (
                        <div className="navbar-item">
                            <a href='/login' className="button is-info" onClick={this.handleLoginn}>Sign in</a>
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
    )
  }
}

export default (Header)