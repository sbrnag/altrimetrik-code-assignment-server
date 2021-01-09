const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please enter username'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  firstName: {
    type: String,
    required: [true, 'Please enter firstName'],
    lowercase: true,
  },
  lastName: {
    type: String,
    required: [true, 'Please enter lastName'],
    lowercase: true,
  },
  gender: {
    type: String,
    required: [true, 'Please enter gender'],
    lowercase: true,
  },
  country: {
    type: String,
    required: [true, 'Please enter country'],
    lowercase: true,
  }
});


// fire a function before doc saved to db
userSchema.pre('save', async function(next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function(username, password) {
  const user = await this.findOne({ username });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect username');
};

const User = mongoose.model('user', userSchema);

module.exports = User;