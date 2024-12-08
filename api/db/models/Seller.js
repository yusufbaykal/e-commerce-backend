const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    phone: { type: String, required: true }, 
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip: { type: String, required: true },
        country: { type: String, required: true },
    },
    is_verified: { type: Boolean, default: false }, 
    store_name: { type: String, required: true }, 
}, { timestamps: true });


class Seller extends mongoose.model {
    
}

schema.loadClass(Seller);
module.exports = mongoose.model('Seller', schema);
