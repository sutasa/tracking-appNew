import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import MapContainer from '../containers/MapContainer'

export default class MapSearch extends Component {

    constructor(props) {
        super()
        this.state = {
            name: [],
            items: "",
            IMEI: [],
            imei: props.imei
        }
    }

    componentDidMount() {

        fetch('http://localhost:5000/api/v1/objects')
            .then((response) => response.json())
            .then(json => {
                this.setState({ name: json })
                this.setState({ IMEI: json })
            });
    }

    filterList = (e) => {
        this.setState({ items: e.target.value })
    }

    changIMEI(imei){
        this.setState({imei})
    }

    render() {
        let listItems = this.state.name.filter(
            (item) => {
                return item.name.toString().toLowerCase().indexOf(this.state.items.toLowerCase()) !== -1
            }
        )

        return (
            <div class="field">
                <div class="control">
                    <textarea class="textarea is-warning" type="text" placeholder="Warning textarea"></textarea>
                </div>
            </div>
        )
    }
}
