import React, { Component } from 'react';
import ReactDOM from 'react-dom'

class MapContainer extends Component {
    constructor() {
        super()
        this.state = {
            locations: [],
            lat: 13.736717,
            lng: 100.523186
        }
    }

    componentDidMount = () => {
        fetch('http://localhost:5000/api/v1/data')
            .then((response) => response.json())
            .then(json => {
                this.setState({ locations: json })
                this.loadMap()
            });
    }

    componentWillReceiveProps = (props) =>{
        console.log('props',props.imei)
        this.state.locations.find((imei) => {
            if (imei.IMEI === props.imei) {
                console.log("check lat lng",imei.geometry.coordinates[1], imei.geometry.coordinates[0])
                this.state.lat = imei.geometry.coordinates[1]
                this.state.lng = imei.geometry.coordinates[0]
            }
        })
        console.log('lat lng', this.state.lat,this.state.lng)
        this.loadMap()
    }

    loadMap(){
        
        if (this.props && this.props.google){
            let mapshow = this.state.locations

            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            
            const mapConfig = Object.assign({}, console.log("latlng2",this.state.lat,this.state.lng),
            {
                center: new google.maps.LatLng(this.state.lat,this.state.lng),//{ lat: this.state.lat, lng: this.state.lng },//
                zoom: 11,
                mapTypeId: 'roadmap'
            })
            
            this.map = new maps.Map(node, mapConfig)
            mapshow.forEach(location => {
                new google.maps.Marker({
                    position: { lat: location.geometry.coordinates[1], lng: location.geometry.coordinates[0] },
                    map: this.map,
                    title: location.IMEI // the title of the marker is set to the name of the location
                });
            })

            // mapRef.addListener('click', function() {
            //   infowindow.open(mapshow, mapRef);
            // });

            // var infowindow = new google.maps.InfoWindow({
            //     content: 'contentString'
            // });
        }
    }

    render() {
        const style = {
            width: '100%',
            height: '90%'
        }
        return (
            <div ref="map" style={style}>
            
            </div>
        )
    }
}

export default MapContainer

