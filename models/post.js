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
    category:{
        type:String,
        required:true,

    }

});

module.exports= mongoose.model('posts',PostSchema);
