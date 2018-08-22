const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const lecture = new Schema({

    file:{

        type: String,
        required: true

    },
    topic:{
        type:String,
        required:true,
        unique:true,
    }

});

module.exports = mongoose.model('lecture', lecture);
