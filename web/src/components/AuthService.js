import decode from 'jwt-decode';

// import FacebookLogin from 'react-facebook-login';


export default class AuthService {
    constructor(domain) {
        this.domain = domain || 'http://localhost:8080' // API server domain
        this.fetch = this.fetch.bind(this) 
        this.login = this.login.bind(this)
        this.getProfile = this.getProfile.bind(this)
        this.isAuthenticated = this.isAuthenticated.bind(this)
        // this.handlesubmitlogin = this.handlesubmitlogin.bind(this)
    }       

    login(email, password) {
        return this.fetch(`${this.domain}/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            this.setToken(res.token) 
            return Promise.resolve(res)
        })
    }

    // handlesubmitlogin(){
    //     this.auth0.authorize({
    //         connection: 'google-oauth2',
    //       })
    // }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken() // GEtting token from localstorage
        return !!token && !this.isTokenExpired(token) // handwaiving here
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    setToken(idToken) {
        const expiresAt = JSON.stringify((129600 * 1000) + new Date().getTime())
        localStorage.setItem('id_token', idToken)
        localStorage.setItem('expires_at',expiresAt)
    }

    getToken() {
        return localStorage.getItem('id_token')
    }

    logout() {
        localStorage.removeItem('id_token')
        localStorage.removeItem('expires_at')
        // facebookResponse = (e) => {};
    }

    getProfile() {
        return decode(this.getToken());
    }

    fetch(url, options) {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    isAuthenticated(){
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
        return new Date().getTime() < expiresAt
    }
}