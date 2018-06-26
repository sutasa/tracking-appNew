import React, { Component } from 'react'

class register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkpass : true
        }
        this.handlechange = this.handlechange.bind(this)
    }


    handlechange(e){
        this.setState({[e.target.name]: e.target.value})
        if(this.state.password !== this.state.prevpassword){
            return this.setState({checkpass: false})
         }else{
            return this.setState({checkpass: true})
         }
    }

    render(){
        return(
            <div className="columns is-centered">
            <div className="column is-half ">
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-12">
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <div className="box">
                                    <p className="title">Sign up</p>
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label>Name:</label>
                                        </div>
                                        <div className="field-body"> 
                                            <div className="field">                                       
                                                <p className="control has-icons-left has-icons-right">
                                                    <input name="username" type="text" className="input is-success" 
                                                        placeholder="name" onChange={this.handlechange} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-user"></i>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label>Email:</label>
                                        </div>
                                        <div className="field-body"> 
                                            <div className="field">
                                                <p className="control has-icons-left has-icons-right">
                                                    <input name="email" type="email" className="input is-success" 
                                                        placeholder="youremail@email.com" onChange={this.handlechange} />
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-envelope"></i>
                                                    </span>
                                                    <span className="icon is-small is-right">
                                                        <i className="fas fa-check"></i>
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label>Plassword:</label>
                                        </div>
                                        <div className="field-body"> 
                                            <div className="field">
                                                <p className="control has-icons-left">
                                                    <input name="prevpassword" type="password" className="input is-success" 
                                                        placeholder="Password" onChange={this.handlechange} /> 
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-lock"></i>
                                                    </span>
                                                </p>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            {/* <label>Confirm Plassword:</label> */}
                                        </div>
                                        <div className="field-body"> 
                                            <div className="field">
                                                <p className="control has-icons-left">
                                                    <input name="password" type="password" className={this.state.checkpass? "input is-success"  : "input is-danger" }
                                                    placeholder="Confirm Password" onChange={this.handlechange} />                                              
                                                    <span className="icon is-small is-left">
                                                        <i className="fas fa-lock"></i>
                                                    </span>
                                                </p>
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="field">
                                        <p className="control">
                                            <p className="level-item has-text-centered is-centered"> {/*level-right*/}
                                                <br/><br/>
                                                <a type="button" className="button is-success">Sign up</a>
                                            </p>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default register