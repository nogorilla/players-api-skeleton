const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtOptions = require('../config/jwt-options');
const _ = require('lodash');

const { User } = require('../models');

/**
 * used to create a user
 * POST /api/users
 * @param first_name       - [string] User first name
 * @param last_name        - [string] User last name
 * @param email            - [string] User email
 * @param password         - [string] User password
 * @param confirm_password - [string] User password confirmation
 * 
 * @return
 *   success - [boolean] Success indicator
 *   user    - [object] User details
 *   token   - [string] JWT token
 *  
 */
exports.create = (req, res, next) => {

  let email            = req.body.email,
      first_name       = req.body.first_name,
      last_name        = req.body.last_name,
      password         = req.body.password,
      confirm_password = req.body.confirm_password,
      err = false,
      msg = [];

  if (password !== confirm_password) {
    return res.status(409).json({ 'message': 'Passwords do not match' });
  } else {
    const user = new User({
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
    });

    User.findOne({ email: req.body.email }, (err, existing) => {
      if (existing) {
        return res.status(409).json({ 
          'success': false,
          'message': 'User already exists'
        });
      }
      user.save((err) => {
        if (err) {
          let errors = [];
          _.each(err.errors, (err) => {
            errors.push(err.message);
          });
          return res.status(409).json({'message': errors.join('; ')})
        } else {
          let token = jwt.sign({ id: user.id } , jwtOptions.secretOrKey )
          return res.status(201).json({
            'success': true,
            'user': {
              'id': user._id,
              'email': user.email,
              'first_name': user.first_name,
              'last_name': user.last_name  
            },
            'token': token
          })
        }
      });
    });
  }
};

/**
 * used to create a player
 * POST /api/users
 * @param email    - [string] User email
 * @param password - [string] User password
 *  
 * @return
 *   success - [boolean] Success indicator
 *   user    - [object] User details
 *   token   - [string] JWT token
 */
exports.login = (req, res) => {
  let email = req.body.email;
  let password = req.body.password;

  User.findOne({ email: email.toLowerCase() }, (err, user) => {
    if (err) { return res.status(500).json({ message: 'An error occured' })}
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ 'message': 'email or password incorrect' });
    } else {
      let token = jwt.sign({ id: user.id } , jwtOptions.secretOrKey )
      return res.status(200).json({
        'success': true,
        'user': {
          'id': user._id,
          'email': user.email,
          'first_name': user.first_name,
          'last_name': user.last_name  
        },
        'token': token
      })
    }
  })
};
