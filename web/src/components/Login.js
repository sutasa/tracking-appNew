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
        <div class="columns">
            <div class="column is-two-fifths is-offset-one-quarter">
                <div class="tile is-ancestor">
                    <div class="tile is-vertical is-12">
                        <div class="tile">
                            <div class="tile is-parent is-vertical">
                                <div class="box">
                                    <p class="title">Sign In</p>
                                        <div class="field">
                                            <label class="label">Email:</label>
                                            <p class="control has-icons-left has-icons-right">
                                                <input name="email" type="email" class="input is-info" 
                                                    placeholder="youremail@email.com" onChange={this.handlechange} />
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-envelope"></i>
                                                </span>
                                                <span class="icon is-small is-right">
                                                    <i class="fas fa-check"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div class="field">
                                            <label class="label">Password:</label>
                                            <p class="control has-icons-left">
                                                <input name="password" type="password" class="input is-info" 
                                                    placeholder="Password" onChange={this.handlechange}/> 
                                                <span class="icon is-small is-left">
                                                    <i class="fas fa-lock"></i>
                                                </span>
                                            </p>
                                        </div> 
                                        <div class="field">
                                            <p class="control">
                                                <p class="level-item has-text-centered level-right">
                                                    <br/><br/>
                                                    <a type="button" class="button is-info" onClick={this.handlesubmit}>Sign in</a>
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