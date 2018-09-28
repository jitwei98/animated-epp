const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    question:{
      type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    answer_hint:{
        type:String,
    },
    category:{
        type:String,
        required:true,

    },
    dp:{
        type:String,
        required:true,
    },
    wrongAnswer1:{
        type:String,
    },
    wrongAnswer1_hint:{
        type:String,
    },
    wrongAnswer2:{
        type:String,
    },
    wrongAnswer2_hint:{
        type:String,
    },
    wrongAnswer3:{
        type:String,
    },
    wrongAnswer3_hint:{
        type:String,
    },




});

module.exports= mongoose.model('posts',PostSchema);
