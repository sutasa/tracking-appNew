import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer'
import Search from '../components/MapSearch'

class Home extends Component {
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
                        <div>
                            <div className="columns">
                                <div className="is-one-fifth">
                                    <Search onFilter={this.onFilter} />
                                </div>
                                <div className="column">
                                    <MapContainer google={this.props.google} />
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBl0GHG6VgXjjS8AR45DGMCmHt4E-jhgDk',
})(Home)