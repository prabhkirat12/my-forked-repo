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

app.post('/login', (req, res) => {
    // Login logic here
    req.session.loggedin = true;
    res.redirect('/');
});
app.post('/logout', (req, res) => {
    req.session.loggedin = false;
    res.redirect('/');
});

app.get('/login', function (req, res) { res.render("login.ejs"); });

app.get('/register', function (req, res) { res.render("register"); });

app.get('/adminindex', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('adminindex', { loggedin: req.session.loggedin, msg: req.session.msg });
    }
    else {
        res.redirect('/login');
    }
});

// login code match email and password
app.post('/logpass', function (req, res) {
    let name = req.body.emails;
    let password = req.body.password;
    let rememberMe = req.body.rememberMe; // Extract rememberMe from request body

    if (name && password) {
        conn.query('SELECT * FROM user WHERE email = ?', [name],
            async function (error, results, fields) {
                if (error) throw error;
                if (results.length > 0) {
                    const user = results[0];
                    // Compare the entered password with the hashed password
                    const isMatch = await bcrypt.compare(password, user.password);
                    if (isMatch) {
                        req.session.loggedin = true;
                        req.session.emails = name;
                        req.session.userId = user.id;

                        // Set a longer-lasting cookie if "Remember Me" is checked
                        if (rememberMe === 'on') { // Checkbox value is 'on' if checked
                            res.cookie('rememberMe', req.session.emails, { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1 year
                        } else {
                            res.clearCookie('rememberMe'); // Remove cookie
                        }

                        // Redirect based on access level
                        if (user.type === "admin") {
                            res.redirect('/adminindex');
                        } else {
                            res.redirect('/serviceabout');
                        }
                    } else {
                        res.send('Incorrect data');
                    }
                } else {
                    res.send('Incorrect');
                }
            });
    } else {
        res.send('Please fill in all fields');
        res.end();
    }
});


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

app.get('/workcontact', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('workcontact', { loggedin: req.session.loggedin, id: req.session.userId });
    }
    else {
        res.redirect('/login');
    }
});

app.get('/serviceabout', function (req, res, next) {
    if (req.session.loggedin) {
        res.render('serviceabout', { loggedin: req.session.loggedin });
    }
    else {
        res.redirect('/login');
    }
});


app.get('/booking', function (req, res) {
    if (req.session.loggedin) {
        res.render('booking', { loggedin: req.session.loggedin });
    }
    else {
        res.redirect('/login');
    }
});


app.post('/register', async (req, res, next) => {
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
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


app.get('/logout', (req, res) => {
    res.clearCookie('rememberMe'); // Clear the rememberMe cookie
    req.session.destroy(() => {
        res.redirect('/');
    });
});

// booking page client side 
app.post('/booking', async (req, res, next) => {
    var name = req.body.name;
    var partnername = req.body.partnername;
    var email = req.body.email;
    var occasiontype = req.body.occasiontype;
    var datetime = req.body.datetime;
    var address = req.body.address;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var hoursofshoot = req.body.hoursofshoot;
    var contactnumber = req.body.hoursofshoot;
    var userId = req.session.userId; // Get user ID from form data

    try {
        var sql = `INSERT INTO bookingshoot (id, name, partnername, email, occasiontype, datetime, address, latitude, longitude, hoursofshoot, contactnumber) VALUES ("${userId}", "${name}", "${partnername}", "${email}", "${occasiontype}", "${datetime}", "${address}", "${latitude}", "${longitude}", "${hoursofshoot}", "${contactnumber}")`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log('record inserted');
            res.render('booking', { loggedin: req.session.loggedin });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
});



// contact me client side 
app.post('/workcontact', async (req, res, next) => {
    var contactmeemail = req.body.contactmeemail;
    var contactmenumber = req.body.contactmenumber;
    var contactmearea = req.body.contactmearea;
    var userId = req.session.userId; // Get user ID from form data

    try {
        var sql = `INSERT INTO contactme (id, email, contactnumbre, details) VALUES ("${userId}", "${contactmeemail}", "${contactmenumber}", "${contactmearea}")`;
        conn.query(sql, function (err, result) {
            if (err) throw err;
            console.log('record inserted');
            res.render('workcontact', { loggedin: req.session.loggedin, id: req.session.userId });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('server error');
    }
});

// image codde is started
const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 15 * 1024 * 1024 }, // 1MB max file size
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('image');

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Route to upload an image
app.post('/adminindex', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            // If there is an error, pass the error message to the view
            res.render('adminindex', {
                msg: err,
                loggedin: req.session.loggedin,
            });
        } else {
            if (req.file == undefined) {
                // If no file is selected, pass a message
                res.render('adminindex', {
                    msg: 'No file selected!',
                    loggedin: req.session.loggedin
                });
            } else {
                // If the file is uploaded, save it to the database and show success message
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

// msg: req.session.msg
// Route to view uploaded images
app.get('/imageview', (req, res) => {
    conn.query('SELECT * FROM images', (err, results) => {
        if (err) throw err;
        res.render('imageview', {
            images: results,
            loggedin: req.session.loggedin
        });
    });
});
app.listen(8005, '0.0.0.0', () => {  // Listen on all network interfaces for Docker compatibility
    console.log('Node app is running on port 8005');
});

