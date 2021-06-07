
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Food = new Schema({
    name: {
        required: true,
        type: String
    },
    restaurant:{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },

});
module.exports = mongoose.model('Food', Food);
