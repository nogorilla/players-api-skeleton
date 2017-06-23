const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/*******
 * Users
 ******/
const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    unique: true,
    required: [true, 'email is required'] 
  },
  password: {
    type: String,
    required: [true, 'password is required'],
  },
  first_name: {
    type: String,
    required: [true, 'first name is required'],
  },
  last_name: {
    type: String,
    required: [true, 'last name is required'],
  },
  players: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'Player' }
  ]
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


/*********
 * Players
 *********/
const playerSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, 'first name is required'],
  }, 
  last_name: {
    type: String,
    required: [true, 'last name is required'],
  }, 
  rating: {
    type: String,
    required: [true, 'rating is required'],
  }, 
  handedness: {
    type: String,
    enum: ['right', 'left'],
    default: 'right',
    required: [true, 'Must be right or left handed']
  },
}, { timestamps: true });

const Player = mongoose.model('Player', playerSchema);
const User   = mongoose.model('User', userSchema);

module.exports = {
  Player: Player,
  User: User
};
