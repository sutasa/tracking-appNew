import React, { Component } from 'react'

class about extends Component {
    render() {
        const { isAuthenticated } = this.props.auth
        return (
            <div>
                {
                    !isAuthenticated() && (
                        <h2>กรุณา Login</h2>
                    )
                }
                {
                    isAuthenticated() && (
                        <p>Hello</p>
                    )
                }
              
            </div>
        );
    }
}

export default about