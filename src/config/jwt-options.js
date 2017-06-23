const ExtractJwt = require('passport-jwt').ExtractJwt;
module.exports = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  secretOrKey: 'CorrectHorseBatteryStaple'
}