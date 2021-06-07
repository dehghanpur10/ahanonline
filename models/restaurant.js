
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Restaurant = new Schema({
    name: {
        required: true,
        type: String
    },
    Foods:[{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }]

});
module.exports = mongoose.model('Restaurant', Restaurant);
