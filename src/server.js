const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('./models');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/pingpong');
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});

app.set('port', 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Passport
 */
app.use(passport.initialize());
passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return done(err); }
    if (!user) {
      return done(null, false, { 'message': `Email ${email} not found.` });
    }
    if (!user.validPassword(password)) {
      return done(null, false, { 'message': 'Incorrect password.' });
    }
    return done(null, user);
  });
}));


const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const playerController = require('./controllers/player');

app.get('/', homeController.index)

app.post('/api/user', userController.create);
app.post('/api/login', userController.login);

app.get('/api/players', playerController.get);
app.post('/api/players', playerController.create);
app.delete('/api/players/:id', playerController.delete);

app.listen(app.get('port'));

module.exports = app;
