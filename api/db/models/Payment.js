const { stat } = require('fs');
const mongoose = require('mongoose');

const schema = mongoose.Schema({
    user_id: {type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    order_id: {type:mongoose.Schema.Types.ObjectId, ref:'Orders'},
    amount: {type:Number, required:true},
    currency: {type:String, required:true},
    status: {type:String, enum: ['Completed', 'Pending', 'Failed', 'Refunded'], required:true},
    payment_method: {type:String, enum: ['credit_card','bank_transfer','paypal'], required:true},
    transaction_id: {type:String, required:true},
    refund: {
        status: {type:String},
        refund_amount: {type:Number},
        refund_date: {type:Date}
    }
},{
    timestamps: true
});

class Payment extends mongoose.model{
        
        }

schema.loadClass(Payment);
module.exports = mongoose.model('Payment', schema);
