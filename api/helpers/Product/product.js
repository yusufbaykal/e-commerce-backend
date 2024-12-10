const Product = require('../../db/models/Product');

const schemaKeys = Object.keys(Product.schema.obj).filter((key) => key !== '_id');

const validateProduct = (body) => {
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

const checkProductNameExists = async (name) => {
  try {
    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return {
        exists: true,
        message: 'A product with the same name already exists.',
      };
    }
    return { exists: false };
  } catch (error) {
    throw new Error('Error checking product name: ' + error.message);
  }
};

module.exports = { validateProduct, checkProductNameExists };
