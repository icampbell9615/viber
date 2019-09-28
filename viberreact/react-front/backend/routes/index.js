const path = require("path");
const router = require('express').Router();
const User = require("../models/user");
const passport = require('passport');
const isAuth = require('../config/passport/isAuthenticated')

router.post('/api/login',
    passport.authenticate('local', {
        failureRedirect: "/login",
        successRedirect: "/dashboard"
    }));

router.post("/register", function (req, res) {
    User.create(req.body)
        .then(function (dbData) {
            res.json(dbData)
        })
        .catch(function (err) {
            res.status(400).send(err)
        })
})

router.get("/dashboard", isAuth, (req, res) => {
    console.log(req.user)
    res.sendFile(path.join(__dirname, "../dashboard.html"))
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
})

router.get("/login", (req, res)=> {
    res.sendFile(path.join(__dirname, "../login.html"))
})

router.use(function (req, res) {
    res.sendFile(path.join(__dirname, "../index.html"))
})

module.exports = router