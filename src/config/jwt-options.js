const ExtractJwt = require('passport-jwt').ExtractJwt;
module.exports = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'CorrectHorseBatteryStaple'
}