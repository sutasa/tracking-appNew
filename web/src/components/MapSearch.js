import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ObjectInfo from '../components/ObjectInfo'
import MapContainer from '../containers/MapContainer'

export default class MapSearch extends Component {

    constructor(props) {
        super()
        this.state = {
            name: [],
            items: "",
            IMEI: [],
            speed:[],
            createdAt:[],
            dname : props.dname,
            imei : props.imei,
            dspeed : props.dspeed        
        }
        this.sendData = this.sendData.bind(this)
    }

    componentDidMount() {

        fetch('http://localhost:5000/api/v1/objects')
            .then((response) => response.json())
            .then(json => {
                this.setState({ name: json })
                this.setState({ IMEI: json })
                this.setState({ createdAt: json})
                this.setState({ speed: json})
            });
    }

    filterList = (e) => {
        this.setState({ items: e.target.value })
    }

    sendData(name,speed,imei){
        this.setState({
            dname : name,
            imei : imei,
            dspeed : speed
        })
        
    }
    render() {
        const style = {
            width: '100%',
            height: "300px",
            "overflow-y": "scroll"
        }

        let listItems = this.state.name.filter(
            (item) => {
                return item.name.toString().toLowerCase().indexOf(this.state.items.toLowerCase()) !== -1
            }
        )

        return (
            <div className="filter-list table is-striped" >
                <ul>
                    <h1>Tracking app</h1><br/>
                    <input value={this.state.items} className="input is-expanded" type="text" onChange={this.filterList.bind(this)} />
                    <br/>
                </ul>
                <ul>
                    <br/>
                    <div style={style}>
                    {listItems.map((item, i) => {
                        return (
                            <div class="control" key={i}>
                                <tr>
                                    <td>name:</td>
                                    <a onClick={() => this.sendData(item.name,item.speed,item.IMEI)}>
                                        <td>{item.name}</td>
                                    </a>
                                    <td>speed</td>
                                    <td>{item.speed}</td>
                                </tr>
                            </div>
                        )
                    })}
                    </div>
                    <br></br>
                    <br/>
                    <ObjectInfo name={this.state.dname} imei={this.state.imei} speed={this.state.dspeed}/>
                </ul> 
            </div>
        )
    }
}
