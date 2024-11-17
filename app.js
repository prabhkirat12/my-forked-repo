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

app.use((req, res, next) => {
  if (req.session.loggedin) {
      return next();
  }

  const useremailFromCookie = req.cookies.rememberMe;
  if (useremailFromCookie) {
      conn.query('SELECT * FROM user WHERE id = ?', [useremailFromCookie], (error, results) => {
          if (error) return next(error);
          if (results.length > 0) {
              req.session.loggedin = true;
              req.session.userId = useremailFromCookie;
              req.session.emails = results[0].email;
              return next();
          }
          next();
      });
  } else {
      next();
  }
});
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', function (req, res) { res.render("index", { loggedin: req.session.loggedin }); });

app.get('/login', function (req, res) { res.render("login.ejs"); });

app.get('/register', function (req, res) { res.render("register"); });



