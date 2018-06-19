import React, { Component } from 'react'
import { GoogleApiWrapper } from 'google-maps-react'
import MapContainer from './MapContainer'
import Search from '../components/MapSearch'

class Home extends Component {
    render() {
        const style = {
            width: '100%',
            height: "100%",
            "border-style" : "solid",
            "border-width": "2px",
            "border-color": "hsl(171, 100%, 41%)",
            "margin-top" : "-1%",
            "margin-right" : "-1%",
            "margin-bottom" : "-1%",
            "margin-left" : "-1%"
        }
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
                        <div className="columns" style={style}>
                            <div >
                                <Search onFilter={this.onFilter} />
                            </div>
                            <div className="column">
                                <MapContainer google={this.props.google} />
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