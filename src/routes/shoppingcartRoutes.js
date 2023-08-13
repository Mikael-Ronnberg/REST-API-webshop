const express = require('express');
const router = express.Router();

const {
    getShoppingcartById,
    createShoppingcart,
    deleteShoppingcart,
    addToShoppingcart,
    removeFromShopcart,
} = require('../controllers/shoppingcartController');

router.get('/:shoppingcartId', getShoppingcartById);
router.post('/', createShoppingcart);
router.put('/:shoppingcartId', addToShoppingcart);
router.post('/:shoppingcartId', removeFromShopcart)
router.delete('/:shoppingcartId', deleteShoppingcart);

module.exports = router;