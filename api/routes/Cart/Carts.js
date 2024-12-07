const express = require('express');
const router = express.Router();
const CartControllers = require('../../controllers/Cart/Cart');
const auth = require('../../middleware/auth');

router.post('/add',async (req, res) => {
    try {
        await CartControllers.addCart(req, res);
    } catch (err) {
    }
    });

module.exports = router;