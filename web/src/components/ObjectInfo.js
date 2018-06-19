import React, { Component } from 'react'

export default class ObjectInfo extends Component {
    render() {
        return (
            <div class="field" >
                <div className="box">
                    <div class="control">
                        <table className="table is-fullwidth">
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
