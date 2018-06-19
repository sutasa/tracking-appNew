import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import google from 'google-maps-react'

class MapContainer extends Component {

    constructor(props) {
        super()
        this.state = {
            locations: [],
            imei: props.imei,
            lat: 13.736717,
            lng: 100.523186
        }
        this.changeCenter = this.changeCenter.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/v1/data')
            .then((response) => response.json())
            .then(json => {
                this.setState({ locations: json })
                this.loadMap();
            });
    }

    changeCenter = () => {
        console.log(this.state.imei)
        this.state.locations.find((imei) => {
            if (imei.IMEI === this.state.imei) {
                console.log(imei.geometry.coordinates[1], imei.geometry.coordinates[0])

                // var center = new google.maps.LatLng(imei.geometry.coordinates[1],imei.geometry.coordinates[0])
                // this.map.penTo(center)
                // this.map.setCenter(
                //     {
                //         lat: imei.geometry.coordinates[1],
                //         lng: imei.geometry.coordinates[0]
                //     }, console.log('lag lng', this.state.lat,this.state.lng)
                // )
            }
        })
    }

    loadMap = () => {
        if (this.props && this.props.google) {

            let mapshow = this.state.locations

            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            const mapConfig = Object.assign({}, {
                center: { lat: 13.736717, lng: 100.523186 }, //{ lat: this.state.lat, lng: this.state.lng },//
                zoom: 11,
                mapTypeId: 'roadmap'
            })

            this.map = new maps.Map(node, mapConfig)
            mapshow.forEach(location => {
                console.log(this.state.locations)
                new google.maps.Marker({
                    position: { lat: location.geometry.coordinates[1], lng: location.geometry.coordinates[0] },
                    map: this.map,
                    title: location.IMEI // the title of the marker is set to the name of the location
                });
            })

            // mapRef.addListener('click', function() {
            //   infowindow.open(mapshow, mapRef);
            // });

            var infowindow = new google.maps.InfoWindow({
                content: 'contentString'
            });
        }
    }

    render() {
        const style = {
            width: '100%',
            height: '500px'
        }

        return (
            <div ref="map" style={style}>
                Loading.....
            </div>
        )
    }
}

MapContainer.defaultState = {
    lat: 13.736717,
    lng: 100.523186
}

export default MapContainer

