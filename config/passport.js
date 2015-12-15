var User = require('../app/models/user');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findByIdAsync(id)
            .then(function (user) {
                done(null, user);
            }).catch(function (err) {
                done(err);
            });
    });

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOneAsync({ 'email': email })
            .then(function (user) {
                if (!user) {
                    return done(null, false, req.flash('message', 'Incorrect username.'));
                }
                if (!user.validPassword(password)) {
                    return done(null, false, req.flash('message', 'Incorrect password.'));
                }
                return done(null, user, req.flash('message', 'Logged in.'));
            }).catch(function(err) {
                done(err);
            });
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, function (req, email, password, done) {
        User.findOneAsync({ "email": email })
            .then(function (user) {
                if (user) {
                    return done(null, false, req.flash('message', 'Email already taken.'));
                }

                var newUser = new User();
                newUser.email = email;
                newUser.name = req.body.name;
                newUser.password = newUser.generateHash(password);
                
                console.log("saving");
                return newUser.saveAsync()
                    .then(function (node) {
                        done(null, newUser, req.flash('message', 'Account created'));
                    });
            }).catch(function (err) {
                done(err);
            });
    }));
};
