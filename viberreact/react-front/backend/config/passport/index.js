const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/user');

// called on login, saves the id to session req.session.passport.user = {id:'..'}
passport.serializeUser((user, done) => {
    done(null, {
        _id: user._id
    })
})

// user object attaches to the request as req.user
passport.deserializeUser((id, done) => {
    User.findById(id, 'email')
        .exec((err, user)=>{
            done(null, user)
        })
})

const strategy = new LocalStrategy({
        usernameField: 'email',
    },
    function (email, password, done) {
        User.findOne({
            email: email
        }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            if (!user.validPassword(password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        });
    }
)
passport.use('local', strategy);
module.exports = passport;