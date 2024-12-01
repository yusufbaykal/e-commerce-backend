const mongoose = require('mongoose');

const schema = mongoose.Schema({
  email: {type:String, required:true, unique:true},
  password: {type:String, required:true},
  first_name: {type:String, required:true},
  last_name: {type:String, required:true},
  phone_number: {type:String, required:true},
  adres: {
    street: {type:String, required:true},
    city: {type:String, required:true},
    state: {type:String, required:true},
    zip: {type:String, required:true},
    country: {type:String, required:true},
  }
},{
  timestamps:{
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

class Users extends mongoose.model{

  }

  schema.loadClass(Users);
  module.exports = mongoose.model('Users', schema);