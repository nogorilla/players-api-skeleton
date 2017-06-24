const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtOptions = require('./config/jwt-options');

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
passport.use(new JwtStrategy(jwtOptions, (jwt_payload, done) => {
  User.findOne({ id: jwt_payload.sub }, (err, user) => {
    if (err) { return done(err, false); }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  })
}))

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
