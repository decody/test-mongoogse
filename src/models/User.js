const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    age: Number,
    email: String,
  },
  { timestamps: true },
);

const User = mongoose.model('user', UserSchema);
module.exports = { User };
