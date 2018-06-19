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
            width: "100%",
            height: "300px",
            "overflow-y": "scroll",
            "border-style" : "solid",
            "border-width": "1px",
            "border-color": "hsl(171, 100%, 41%)"
        }

        let listItems = this.state.name.filter(
            (item) => {
                return item.name.toString().toLowerCase().indexOf(this.state.items.toLowerCase()) !== -1
            }
        )

        return (
        <div className="column">
            <div className="filter-list" >
                <ul>
                    <input value={this.state.items} className="input is-expanded is-primary" type="text" onChange={this.filterList.bind(this)} 
                        placeholder="search...."/>
                    <br/>
                </ul>
                <ul>
                    <br/>
                    <div class="control">
                        <div style={style} >
                            <table className="table is-fullwidth">
                                <tbody>
                                    {listItems.map((item, i) => {
                                        return (
                                            <tr >                                                
                                                <a key={i} onClick={() => this.sendData(item.name,item.speed,item.IMEI)}>
                                                    {/* <td>name:</td> */}
                                                    <td>{item.name}</td>
                                                    <td>speed</td>
                                                    <td>{item.speed}</td>
                                                    <td></td>
                                                </a>                                                
                                            </tr>                           
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <br/>
                    <ObjectInfo name={this.state.dname} imei={this.state.imei} speed={this.state.dspeed}/>
                </ul> 
            </div>
        </div>   
        )
    }
}
