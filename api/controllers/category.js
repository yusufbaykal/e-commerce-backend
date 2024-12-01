const Category = require('../db/models/Category')
const schemaKeys = Object.keys(Category.schema.obj).filter(key => key !== '_id');

const validateCategory = (body) => {
    const bodyKeys = Object.keys(body);

    const invalidKeys = bodyKeys.filter(key => !schemaKeys.includes(key));
    if (invalidKeys.length > 0) {
        return { type: 'invalidFields', keys: invalidKeys };
    }

    const missingKeys = schemaKeys.filter(key => !bodyKeys.includes(key));
    if (missingKeys.length > 0) {
        return { type: 'missingFields', keys: missingKeys };
    }
    return null;
};

module.exports = { validateCategory };




