
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Restaurant = new Schema({
    name: {
        required: true,
        type: String
    },
    foods:[{
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }],
    orders:[{
        type: Schema.Types.ObjectId,
        ref: 'Order'
    }]

});
module.exports = mongoose.model('Restaurant', Restaurant);
