const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
   firstName:{
        type:String,
       required: true,
   },
    lastName:{
       type:String,
        required:true,
    },
    email:{
       type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    authentication:{
       type:String,
        default:'student',
    }

});

UserSchema.methods.testMethod = function(){
    console.log('Useing schema method');
};

module.exports = mongoose.model('users',UserSchema);