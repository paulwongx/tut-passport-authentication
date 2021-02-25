const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const app = express();
const User = require('./user');

//----------------------------------------- END OF IMPORTS---------------------------------------------------

mongoose.connect('mongodb+srv://newuser123:qFTAsEL0W4MORnU4@cluster0.7xogm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology: true,
}, ()=>{
    console.log('Mongoose has connected');
});

// Middleware
app.use(express.json()); // instead of app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(session({
    secret: `secretcode`,
    resave: true,
    saveUninitialized: true,
}));

app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require('./passportConfig')(passport);

//----------------------------------------- END OF MIDDLEWARE---------------------------------------------------

app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) throw err;
        if (!user) res.send('No user exists');
        else {
            req.logIn(user, err => {
                if (err) throw err;
                res.send('Successfully Authenticated');
                console.log(req.user);
            })
        }
    })(req, res, next);
});
app.post('/register', (req, res) => {
    console.log(req.body);
    User.findOne({username: req.body.username}, async (err, doc) => {
        if (err) throw err;
        if (doc) res.send('User already exists');
        if (!doc) {
            const hashedPassword = await bcrypt.hash(req.body.password, 12);

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword,
            });
            await newUser.save();
            res.send('User created');
        }
    });
});
app.get('/user', (req, res) => {
    res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

//----------------------------------------- END OF ROUTES---------------------------------------------------

// Start Server
app.listen(4001, () => {
    console.log('Server has started on port 4001');
})

