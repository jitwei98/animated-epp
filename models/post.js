const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    question:{
      type:String,

    },
    answer:{
        type:String,
    },

});

module.exports= mongoose.model('posts',PostSchema);
