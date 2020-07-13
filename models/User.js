const mongoose = require('mongoose');

const userSchema = mongoose.userSchema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String
  },
  created_at:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('User',userSchema);
