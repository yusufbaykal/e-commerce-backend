const mongoose  = require('mongoose');

const schema = mongoose.Schema({
    user_id: {type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    items: {
        product_id: {type:mongoose.Schema.Types.ObjectId, ref:'Product'},
        quantity: {type:Number, required:true},
        total_price: {type:Number, required:true},
    },
    status: {type:String, required:true},
    shipping_address: {type:String, required:true},
    is_active: {type:Boolean, default:true},
    payment_id: {type:mongoose.Schema.Types.ObjectId, ref:'Payment'},
},{
    timestamps: true
});