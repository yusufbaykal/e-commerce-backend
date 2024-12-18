const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const is = require('is_js');
const { roles } = require('../../../config/Role/rolePermissions');

const schema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    adres: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },
    roles: { type: String, required: true, enum: roles.map((role) => role.id) },
  },
  {
    timestamps: true,
  },
);

class Users extends mongoose.model {
  validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  static validateFieldsBeforeAuth(email, password) {
    if (typeof password !== 'string' || password.length < 8 || is.not.email(email)) return 'Invalid email or password';
    return null;
  }
}

schema.loadClass(Users);
module.exports = mongoose.model('Users', schema);
