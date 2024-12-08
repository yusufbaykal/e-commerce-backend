const express = require('express');
const router = express.Router();
const CartControllers = require('../../controllers/Cart/Cart');
const auth = require('../../middleware/Auth/auth');



router.get('/get',async (req, res) => {
    try {
        await CartControllers.getCart(req, res);
    } catch (err) {
    }
    }
);

router.post('/add',async (req, res) => {
    try {
        await CartControllers.addCart(req, res);
    } catch (err) {
    }
    });

router.put('/update',async (req, res) => {
    try {
        await CartControllers.updateCart(req, res);
    } catch (err) {
    }
    }
);

router.delete('/delete',async (req, res) => {
    try {
        await CartControllers.deleteCart(req, res);
    } catch (err) {
    }
    }
);

module.exports = router;