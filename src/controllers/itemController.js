const Item = require('../models/Item');
const { NotFoundError } = require('../utils/error')

exports.getItemById = async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const item = await Item.findById(itemId);
        if (!item) throw new NotFoundError('That item does not really exist');
        return res.status(200).json(item);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: error.message,
        });
    }
}

exports.getAllItems = async (req, res) => {
    const items = await Item.find();
    return res.json(items);
}