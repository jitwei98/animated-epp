const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    title:{
        type:String,
        require:true,

    },


});

module.exports= mongoose.model('comments',CommentSchema);
