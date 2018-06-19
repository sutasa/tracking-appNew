import React, { Component } from 'react'

export default class ObjectInfo extends Component {
    render() {
        const style = {
            width: '100%',
            height: "100%",
            "border-style" : "solid",
            "border-width": "1px",
            "border-color": "hsl(171, 100%, 41%)"
        }
        return (
            <div class="field" >
                <div class="control">
                    <h1><strong>Infomation</strong></h1>
                    <div >
                        <table className="table is-fullwidth" style={style}>
                            <tbody>
                                <tr>
                                    <td>name</td>
                                    <td>{this.props.name}</td> 
                                </tr>
                                <tr>    
                                    <td>IMEI</td>
                                    <td>{this.props.imei} </td> 
                                </tr>
                                <tr>    
                                    <td>speed</td>
                                    <td>{this.props.speed} </td> 
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}
