const Users = require('../../db/models/Users/Users');
const is = require('is_js');

const schemaKeys = Object.keys(Users.schema.obj).filter((key) => key !== '_id');

const validateUsers = (body) => {
  const requiredFields = ['email', 'password', 'first_name', 'last_name', 'phone_number', 'adres'];
  const missingFields = requiredFields.filter(field => !body[field]);

  if (missingFields.length > 0) {
    return {
      type: 'missingFields',
      keys: missingFields
    };
  }

  const invalidFields = [];
  if (!is.email(body.email)) invalidFields.push('email');
  if (typeof body.password !== 'string' || body.password.length < 8) invalidFields.push('password');
  if (typeof body.first_name !== 'string') invalidFields.push('first_name');
  if (typeof body.last_name !== 'string') invalidFields.push('last_name');
  if (typeof body.phone_number !== 'string') invalidFields.push('phone_number');
  if (typeof body.adres !== 'object') invalidFields.push('adres');
  if (body.adres) {
    if (typeof body.adres.street !== 'string') invalidFields.push('adres.street');
    if (typeof body.adres.city !== 'string') invalidFields.push('adres.city');
    if (typeof body.adres.state !== 'string') invalidFields.push('adres.state');
    if (typeof body.adres.zip !== 'string') invalidFields.push('adres.zip');
    if (typeof body.adres.country !== 'string') invalidFields.push('adres.country');
  }
  if (body.isSeller !== undefined && typeof body.isSeller !== 'boolean') invalidFields.push('isSeller');

  if (invalidFields.length > 0) {
    return {
      type: 'invalidFields',
      keys: invalidFields
    };
  }

  return null;
};

const checkUserEmailExists = async (email) => {
  try {
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return {
        exists: true,
        message: 'A user with the same email already exists.',
      };
    }
    return { exists: false };
  } catch (error) {
    throw new Error('Error checking user email: ' + error.message);
  }
};

const checkEmailControl = async (email) => {
  try {
    const userEmailValid = is.email(email);

    if (!userEmailValid) {
      return { exists: false, message: 'Email is not valid.' };
    }

    return { exists: true, message: 'Email is valid.' };
  } catch (error) {
    throw new Error('Error checking user email: ' + error.message);
  }
};

const checkuserControl = async (email) => {
  try {
    const user = await Users.findOne({ email });
    if (user) {
      return { exists: true, message: 'User found' };
    }
    return { exists: false, message: 'User not found' };
  } catch (error) {
    throw new Error('Error checking user: ' + error.message);
  }
};

module.exports = { validateUsers, checkUserEmailExists, checkEmailControl, checkuserControl };
