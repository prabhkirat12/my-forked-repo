var express = require('express');
var app = express();
const bcrypt = require('bcryptjs');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var conn = require('./dbConfig');

app.set('view engine', 'ejs');

app.use(cookieParser()); // Add cookie-parser middleware

app.use(session({
    secret: 'yoursecret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 } // Default session cookie settings
}));

