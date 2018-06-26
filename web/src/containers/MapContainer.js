import React, { Component } from 'react';
import ReactDOM from 'react-dom'

export default class MapContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            locations: [],
            currentLocation: 
            {
                lat: 13.736717,
                lng: 100.523186
            }            
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

    componentDidUpdate(prevProps, prevState) {
            this.recenterMap();
    }

    componentWillReceiveProps = (props) =>{
        this.state.locations.find((imei) => {
            if (imei.IMEI === props.imei) {
                this.state.currentLocation.lat = imei.geometry.coordinates[1]
                this.state.currentLocation.lng = imei.geometry.coordinates[0]
            }
        })    
    }

    recenterMap() {
        const map = this.map;
    
        const { google } = this.props;
        const maps = google.maps;
        // console.log(map)
        if (map) {
          let  center = this.state.currentLocation   //{lat :13.6516148 , lng: 100.4540369}; 
          console.log(center)
          if (!(center instanceof google.maps.LatLng)) {
            center = {lat :13.8034081 , lng: 100.5521107}
            console.log(center)
         }
       //   map.panTo(center)
          map.setCenter(center);
          maps.event.trigger(map, 'recenter');
        }
    }

    loadMap(){
        if (this.props && this.props.google){
            let mapshow = this.state.locations

            const { google } = this.props;
            const maps = google.maps;

            const mapRef = this.refs.map;
            const node = ReactDOM.findDOMNode(mapRef);
            
            const mapConfig = Object.assign({},
            {
                center: new google.maps.LatLng(this.state.currentLocation.lat ,this.state.currentLocation.lng),//{ lat: this.state.currentLocation.lat, lng: this.state.currentLocation.lng },
                zoom: 11,
                mapTypeId: 'roadmap'
            })
            
            this.map = new maps.Map(node, mapConfig)
            mapshow.forEach(location => {
                new google.maps.Marker({
                    position: { lat: location.geometry.coordinates[1], lng: location.geometry.coordinates[0] },
                    map: this.map,
                    title: toString(location.IMEI), // the title of the marker is set to the name of the location
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
            height: '100%'
        }
        return (
            <div ref="map" style={style}>
            
            </div>
        )
    }
}

 

