const mongoose = require('mongoose');

const schema = mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true },
        total_price: { type: Number, required: true },
    }],
}, {
    timestamps: true 
});

const Cart = mongoose.model('Cart', schema);
module.exports = Cart;