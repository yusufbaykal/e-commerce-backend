const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {type:String, required:true},
    is_active : {type:Boolean, default:true}
},{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated'
    }
});

class Category extends mongoose.model{
        }

schema.loadClass(Category);
module.exports = mongoose.model('Category', schema);

    