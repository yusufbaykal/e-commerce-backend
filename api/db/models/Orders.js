const mongoose  = require('mongoose');

const schema = mongoose.Schema({
    user_id: {type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    items: [{
        product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        total_price: { type: Number, required: true },
    }],
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
    },
    shipping_address: {
        street: {type:String, required:true},
        city: {type:String, required:true},
        state: {type:String, required:true},
        zip: {type:String, required:true},
        country: {type:String, required:true},
      },
    is_active: {type:Boolean, default:true}
},{
    timestamps: true
});


class Orders extends mongoose.model{
    
}

schema.loadClass(Orders);
module.exports = mongoose.model('Orders', schema);
