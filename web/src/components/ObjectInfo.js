import React, { Component } from 'react'

export default class ObjectInfo extends Component {
    render() {
        const style = {
            width: '100%',
            height: "100%",
            "backgroundColor": "hsl(0, 0%, 100%)"
        }        
        return (
            <div className="control">
                <br/>
                <h1><strong>Information</strong></h1>
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
        )
    }
}
