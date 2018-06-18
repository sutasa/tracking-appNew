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
            <div className="filter-list">
                <ul>
                    <h1>Tracking app</h1>
                    <input value={this.state.items} className="input is-expanded" type="text" onChange={this.filterList.bind(this)} />
                </ul>
                <ul>
                    {listItems.map((item, i) => {
                        return (
                            <div key={i}>
                                <li key={i}>
                                    <a>
                                        {item.name}
                                        {/* <MapContainer imei={item.IMEI}/> */}
                                    </a>
                                </li>
                            </div>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
