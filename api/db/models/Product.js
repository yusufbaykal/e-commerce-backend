const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {type:String, required:true},
    price: {type:Number, required:true},
    description: {type:String, required:true},
    is_active: {type:Boolean, default:true},
    category: {type:String, required:true},
    category_id: {type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    image: {type:String, required:true},
    stock: {type:Number, required:true},
},{
    timestamps: true
});


const Product = mongoose.model('Product', schema);
module.exports = Product;
