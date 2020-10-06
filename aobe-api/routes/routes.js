module.exports = function(app, passport) {
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/'
    }));
}