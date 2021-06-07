
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Order = new Schema({
    restaurant: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    foods:[{
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Food'
    }]

});
module.exports = mongoose.model('Order', Order);
