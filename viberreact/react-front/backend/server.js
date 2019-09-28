const express = require('express');
const app = express();
const mongoose = require("mongoose");
const passport = require('./config/passport');
const session = require('express-session')
const PORT = process.env.PORT || 4000;

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());


const uri = 'mongodb://localhost/passportTest';
mongoose.connect(uri, {
    useNewUrlParser: true
});

const MongoStore = require('connect-mongo')(session)
app.use(
    session({
        secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        }),
        resave: true, //required
        saveUninitialized: true //required
    })
)
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser

const routes = require('./routes');
app.use(routes)

app.listen(PORT, function () {
    console.log("PORT: " + PORT)
})