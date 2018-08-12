const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ohmLawSlide = new Schema({

    file:{

        type: String,
        required: true

    },
    order:{
        type:String,
        required:true,
    }

});

module.exports = mongoose.model('ohms_Law', ohmLawSlide);
