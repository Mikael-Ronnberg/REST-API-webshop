const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    itemTitle: {
        type: String,
        unique: true,
        required: true,
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    itemQuantity: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Item', ItemSchema, 'items');