var services = require('./backendServices');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    services.sensor.getAll().then(function(sensors){
      res.render('index.ejs', {user: req.user, message: req.flash('message'), viewInitData: {
        sensors: sensors
      }});
    });  
  });
  
  // sensors page
  app.get('/sensors', isLoggedIn, function(req, res) {
    services.sensor.getAll().then(function(sensors){
      res.render('sensors.ejs', {user: req.user, message: req.flash('message'), viewInitData: {
        sensors: sensors
      }});
    });    
  });
  
  //local login
  app.get('/login', function(req, res) {
    res.render('login.ejs', {user: null, message: req.flash('message')});
  });
  
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

  app.get('/signup', function(req, res) {
    res.render('signup.ejs', {user: null, message: req.flash('message')});
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup'
  }));

  //logout
  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  req.flash('message', 'You have to login');
  res.redirect('/login');
}
