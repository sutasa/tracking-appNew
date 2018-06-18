import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class ObjectInfo extends Component {
    render() {
        return (
            <div class="field">
                <div class="control">
                    <textarea class="textarea is-warning" type="text" placeholder="Warning textarea">
                        {this.props.imei}
                    </textarea>
                </div>
            </div>
        )
    }
}
