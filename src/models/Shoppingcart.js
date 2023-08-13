const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
    itemPrice: {
        type: Number,
        required: true,
    },
    itemTitle: {
        type: String,
        unique: true,
    },
    itemQuantity: {
        type: Number,
        required: true,
    }
});

const ShoppingcartSchema = new mongoose.Schema({
    totalPrice: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    itemsInShoppingcart: [ItemSchema],
});

module.exports = mongoose.model('Shoppingcart', ShoppingcartSchema);