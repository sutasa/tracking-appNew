const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');
const db = require('./db.json')
const app = express();


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const jwtMW = exjwt({
    secret: 'keyboard cat 4 ever'
});


let users = db.users

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    for (let user of users) { 
        if (email == user.email && password == user.password) {
            let token = jwt.sign({ id: user.id, name: user.name, email: user.email }, 'keyboard cat 4 ever', { expiresIn: 129600 }); // Sigining the token
            res.json({
                sucess: true,
                err: null,
                token
            });
            break;
        }
        else {
            res.status(401).json({
                sucess: false,
                token: null,
                err: 'Username or password is incorrect'
            });
        }
    }
});

app.get('/', jwtMW , (req, res) => {
    // res.send('You are authenticated');
});

app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') { 
        res.status(401).send(err);
    }
    else {
        next(err);
    }
});

const PORT = 8080 
app.listen(PORT, () => {
    console.log(`connect to Port:${PORT}`);
});
