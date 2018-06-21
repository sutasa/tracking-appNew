import React, { Component } from 'react'
import ObjectInfo from '../components/ObjectInfo'
import MapContainer from '../containers/MapContainer'

class MapSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: [],
            items: "",
            IMEI: [],
            speed:[],
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
                this.setState({ speed: json})
            });
    }

    filterList = (e) => {
        this.setState({ items: e.target.value })
    }

    sendData = (name,speed,imei) => {
        this.setState({
            dname : name,
            imei : imei,
            dspeed : speed
        });   
    }

    render() {
        const style = {
            width: "100%",
            height: "250px",
            "overflowY": "scroll"
        }       
        
        let listItems = this.state.name.filter(
            (item) => {
                return item.name.toString().toLowerCase().indexOf(this.state.items.toLowerCase()) !== -1
            }
        )

        return (
            <div className="column">
                <ul>
                    <p className="control has-icons-left">
                        <input value={this.state.items} className="input is-expanded is-info" type="text" onChange={this.filterList.bind(this)} 
                            placeholder="Search...."/>
                        <span className="icon is-small is-left">
                            <i className="fas fa-search"></i>
                        </span>
                    </p>
                </ul>
                <ul>
                    <br/>
                    <div className="control">
                        <div style={style} >
                            <table className="table is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>speed</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listItems.map((item, i) => {
                                        return (
                                            <tr key={i}>
                                                <td><a onClick={() => this.sendData(item.name,item.speed,item.IMEI)}>{item.name}</a> </td>
                                                <td>{item.speed}</td>                                                                                              
                                            </tr>                                                                       
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </ul> 
                <MapContainer imei={this.state.imei} />
                <ObjectInfo name={this.state.dname} imei={this.state.imei} speed={this.state.dspeed}  />
            </div>   
        )
    }
}
MapSearch.defaultProps = {
    dname : null,
    imei : null,
    dspeed : null   
};
export default MapSearch