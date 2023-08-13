const Item = require('../models/Item');
const Shoppingcart = require('../models/Shoppingcart');
const { NotFoundError } = require('../utils/error');

exports.getShoppingcartById = async (req, res, next) => {
    try {
        const shoppingcartId = req.params.shoppingcartId;
        const shoppingcart = await Shoppingcart.findById(shoppingcartId);
        if (!shoppingcart) throw new NotFoundError('That shopping cart does not really exist');
        return res.status(200).json(shoppingcart);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

exports.createShoppingcart = async (req, res, next) => {
    try {
        await Shoppingcart.deleteMany()
        const newShoppingcart = await Shoppingcart.create({
            totalPrice: 0,
            quantity: 0,
            itemsInShoppingcart: [],
        });
        return res.setHeader('Location', `/api/v1/shoppingcarts/${newShoppingcart._id.toString()}`).status(201).json(newShoppingcart);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

exports.addToShoppingcart = async (req, res, next) => {
    try {
        const shoppingcartId = req.params.shoppingcartId;
        const shoppingcart = await Shoppingcart.findById(shoppingcartId);

        if (!shoppingcart) throw new NotFoundError('That shopping cart does not really exist');

        const itemId = req.body.id;
        const item = await Item.findById(itemId);

        if (!item) throw new NotFoundError('That item does not really exist');
        const shoppingcartContainer = shoppingcart.itemsInShoppingcart;

        const newItem = {
            itemName: item.itemTitle,
            itemPrice: item.itemPrice,
            itemQuantity: 1,
            _id: item._id,
        };

        const findItem = shoppingcartContainer.find((item) => item._id == itemId);

        if (findItem) {
            findItem.itemQuantity += 1;
        } else {
            shoppingcartContainer.push(newItem);
        }
        shoppingcart.totalPrice += newItem.itemPrice;
        shoppingcart.quantity += 1;

        const updateShoppingcart = await shoppingcart.save();
        return res.status(201).json(updateShoppingcart);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

exports.removeFromShopcart = async (req, res, next) => {
    try {
        const shoppingcartId = req.params.shoppingcartId;
        const shoppingcart = await Shoppingcart.findById(shoppingcartId);

        if (!shoppingcart) throw new NotFoundError('That shopping cart does not really exist');
        const itemId = req.body.id;
        const item = await Item.findById(itemId);

        if (!item) throw new NotFoundError('That item does not seem to exist');
        const shoppingcartContainer = shoppingcart.itemsInShoppingcart;
        const itemIndex = shoppingcartContainer.findIndex((item) => item._id == itemId);
        const findItem = shoppingcartContainer.find((item) => item._id == itemId);

        if (!findItem) throw new NotFoundError('That item is not in your shopping cart');

        if (findItem && (findItem.itemQuantity >= 2)) {
            findItem.itemQuantity = findItem.itemQuantity - 1;
        } else {
            shoppingcartContainer.splice(itemIndex, 1);
        }
        if (shoppingcart.quantity >= 1) {
            shoppingcart.totalPrice = shoppingcart.totalPrice - item.itemPrice;
            shoppingcart.quantity = shoppingcart.quantity - 1;
        }
        const updateShoppingcart = await shoppingcart.save();
        return res.status(202).json(updateShoppingcart);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
};

exports.deleteShoppingcart = async (req, res, next) => {
    try {
        const shoppingcartId = req.params.shoppingcartId;
        const shoppingcartToDelete = await Shoppingcart.findById(shoppingcartId);

        if (!shoppingcartToDelete) throw new NotFoundError('That shopping cart does not actually exist');

        await shoppingcartToDelete.deleteOne();
        return res.sendStatus(204);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}
