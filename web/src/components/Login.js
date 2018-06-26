import React,{Component} from 'react'
import AuthService from './AuthService'
import history from '../history'

class Login extends Component {
    constructor(props) {
        super(props)
        this.handlechange = this.handlechange.bind(this)
        this.handlesubmit = this.handlesubmit.bind(this)
        this.Auth = new AuthService()
    }

    handlechange(e){
        this.setState({[e.target.name]: e.target.value})
    }

    handlesubmit(e){
        e.preventDefault()
        try {
            this.Auth.login(this.state.email,this.state.password)
            .then(res =>{
                history.replace('/home')
            })
            .catch(err =>{
                alert(err)
            })            
        } catch (error) {
            alert("Please Input email and password")
        }  
    }

    componentWillMount(){ 
        if(this.Auth.loggedIn()){
            history.replace('/')
        }
    }

    render(){
        return(
        <div className="columns is-centered">
            <div className="column is-two-fifths ">
                <div className="tile is-ancestor">
                    <div className="tile is-vertical is-12">
                        <div className="tile">
                            <div className="tile is-parent is-vertical">
                                <div className="box">
                                    <p className="title">Sign In</p>
                                        <div className="field">
                                            <label className="label">Email:</label>
                                            <p className="control has-icons-left has-icons-right">
                                                <input name="email" type="email" className="input is-info" 
                                                    placeholder="youremail@email.com" onChange={this.handlechange} />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-envelope"></i>
                                                </span>
                                                <span className="icon is-small is-right">
                                                    <i className="fas fa-check"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <label className="label">Password:</label>
                                            <p className="control has-icons-left">
                                                <input name="password" type="password" className="input is-info" 
                                                    placeholder="Password" onChange={this.handlechange} /> 
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-lock"></i>
                                                </span>
                                            </p>
                                        </div> 
                                        <div className="field">
                                            <p className="control">
                                                <p className="level-item has-text-centered level-right">
                                                    <br/><br/>
                                                    <a type="button" className="button is-info" onClick={this.handlesubmit}>Sign in</a>
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

export default Login