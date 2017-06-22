const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  first_name: String,
  last_name: String,
}, { timestamps: true });

userSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) { return next(); }
  user.password = bcrypt.hashSync(user.password, 10);
  next();
});

userSchema.methods.validPassword = function validPassword(password) {
  const user = this;
  return bcrypt.compareSync(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = {
  Player: {},
  User: User
};
