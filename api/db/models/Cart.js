const mongoose = require('mongoose');

const schema = mongoose.Schema({
    uswer_id: {type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    items: {
        product_id: {type:mongoose.Schema.Types.ObjectId, ref:'Product'},
        quantity: {type:Number, required:true},
        total_price: {type:Number, required:true},
    },
    timestamp: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

class Orders extends mongoose.model{
    
    }

schema.loadClass(Orders);
module.exports = mongoose.model('Orders', schema);

