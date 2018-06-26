import React, { Component } from 'react'
import ObjectInfo from '../components/ObjectInfo'
import MapContainer from '../containers/MapContainer'
import { GoogleApiWrapper } from 'google-maps-react'
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import {formatDate, parseDate} from 'react-day-picker/moment'
import 'moment/locale/it'

class MapSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            objects: [],
            items: "",
            dname : props.dname,
            imei : props.imei,
            dspeed : props.dspeed,
        }
        this.sendData = this.sendData.bind(this)
    }

    componentDidMount() {
        fetch('http://localhost:5000/api/v1/objects')
            .then((response) => response.json())
            .then(json => {
                this.setState({ objects: json })
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
            height: "230px",
            "overflowY": "scroll"
        }
        const box = {
            width: 250,
            height: 540
        }   
        
   

        let listItems = this.state.objects.filter(
            (item) => {
                return item.name.toString().toLowerCase().indexOf(this.state.items.toLowerCase()) !== -1
            }
        )

        return (
            <div className="column" style={box}>
                <Tabs>
                    <TabList className="tabs is-toggle is-small is-fullwidth">
                            <Tab className="is-active"><a>Object</a></Tab>
                            <Tab><a>History</a></Tab>                        
                    </TabList>

                    <TabPanel>
                        <p className="control has-icons-left">
                            <input value={this.state.items} className="input is-expanded is-info is-mediam" 
                            type="text" onChange={this.filterList.bind(this)} 
                                placeholder="Search...."/>
                            <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                            </span>
                        </p>    
                        <br/>
                        <div>
                            <div style={style} >
                                <table className="table is-fullwidth">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>name</th>
                                            <th>speed</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listItems.map((item, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td><i className="fas fa-car"></i></td>
                                                    <td><a onClick={() => this.sendData(item.name,item.object_data.speed,item.IMEI)}>{item.name}</a> </td>
                                                    <td>{item.object_data.speed}</td>                                                                                              
                                                </tr>                                                                       
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <MapContainer imei={this.state.imei} google={this.props.google} />
                        <ObjectInfo name={this.state.dname} imei={this.state.imei} speed={this.state.dspeed}  />
                    </TabPanel> 

                    <TabPanel>
                        <div className="control has-icons-right">     
                            <DayPickerInput inputProps={{ style: { width: 226 , height: 36 ,"text-align": "center",
                                color: "rgb(32, 156, 238)",padding: ".5em 1em","font-size": "1em" ,"borderColor": "rgb(32, 156, 238)","border": "1px solid" ,
                                "borderRadius": "2px"}}} 

                                formatDate={formatDate}
                                parseDate={parseDate}
                                placeholder={`${formatDate(new Date())}`}                        
                            />
                            {/* <span className="icon is-small is-right">
                                <i className="fas fa-calendar"></i>
                            </span> */}
                        </div>
                    </TabPanel>
                </Tabs>
            </div>   
        )
    }
}
MapSearch.defaultProps = {
    dname : null,
    imei : null,
    dspeed : null   
};
export default GoogleApiWrapper({
    apiKey: 'AIzaSyBl0GHG6VgXjjS8AR45DGMCmHt4E-jhgDk',
})(MapSearch)