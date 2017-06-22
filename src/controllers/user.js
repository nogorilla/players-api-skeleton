const passport = require('passport');

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

  if (!email) {
    err = true;
    msg.push('email is required');
  }

  if (!first_name) {
    err = true;
    msg.push('first_name is required');
  }

  if (!last_name) {
    err = true;
    msg.push('last_name is required');
  }

  if (password !== confirm_password) {
    err = true;
    msg.push('passwords do not match');
  }

  if (err) {
    return res.status(409).json({'msg': msg.join('; ')});
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
        return res.status(201).json({
          'success': true,
          'user': {
            'id': user._id,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name  
          },
          'token': 'some-token'
        })
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
  res.json({
    'controller': 'User',
    'method': 'login'
  });
};
