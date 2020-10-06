var LocalStrategy = require("passport-local").Strategy;

var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var dbconfig = require('./config/db.config');
var connection = require("./models/db.js");

module.exports = function(passport) {
    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        connection.query("SELECT * FROM users WHERE id = ? ", [id],
        function(err, rows){
            done(err, rows[0]);
        });
    });

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, password, done){
            connection.query("SELECT * FROM users WHERE username = ? ", [username],
            function(err, rows){
                if(err)
                    return done(err);
                if(!rows.length){
                    return done(null, false);
                }
                if(!bcrypt.compareSync(password, rows[0].password)){
                    return done(null, false);
                }
                return done(null, rows[0]);
            });
        })
    );
};
