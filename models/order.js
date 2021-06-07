
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Restaurant = new Schema({
    restaurant: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    Foods:[{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }]

});
module.exports = mongoose.model('Restaurant', Restaurant);
