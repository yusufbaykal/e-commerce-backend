const Users = require('../../db/models/Users');
const is = require('is_js');

const schemaKeys = Object.keys(Users.schema.obj).filter((key) => key !== '_id');

const validateUsers = (body) => {
  const bodyKeys = Object.keys(body);

  const invalidKeys = bodyKeys.filter((key) => !schemaKeys.includes(key));
  if (invalidKeys.length > 0) {
    return { type: 'invalidFields', keys: invalidKeys };
  }

  const missingKeys = schemaKeys.filter((key) => !bodyKeys.includes(key));
  if (missingKeys.length > 0) {
    return { type: 'missingFields', keys: missingKeys };
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
