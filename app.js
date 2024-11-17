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

app.post('/login', (req, res) => {
  req.session.loggedin = true;
  res.redirect('/');
});

app.post('/register', async (req, res, next) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      var sql = `INSERT INTO user (username, email, password) VALUES ("${username}", "${email}", "${hashedPassword}")`;
      conn.query(sql, function (err, result) {
          if (err) throw err;
          console.log('Record inserted');
          res.render('login');
      });
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 15 * 1024 * 1024 },
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

app.post('/adminindex', (req, res) => {
  upload(req, res, (err) => {
      if (err) {
          res.render('adminindex', {
              msg: err,
              loggedin: req.session.loggedin,
          });
      } else {
          if (req.file == undefined) {
              res.render('adminindex', {
                  msg: 'No file selected!',
                  loggedin: req.session.loggedin
              });
          } else {
              var userId = req.session.userId;
              const imagePath = `/uploads/${req.file.filename}`;

              conn.query('INSERT INTO images (id, imgpath) VALUES (?, ?)', [userId, imagePath], function(err, result) {
                  if (err) throw err;
                  res.render('adminindex', {
                      msg: 'Image uploaded successfully!',
                      loggedin: req.session.loggedin
                  });
              });
          }
      }
  });
});

app.get('/imageview', (req, res) => {
  conn.query('SELECT * FROM images', (err, results) => {
      if (err) throw err;
      res.render('imageview', {
          images: results,
          loggedin: req.session.loggedin
      });
  });
});




