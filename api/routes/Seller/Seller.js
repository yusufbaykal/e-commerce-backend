const express = require('express');
const router = express.Router();
const SellerControllers = require('../../controllers/Seller/Seller');

router.post('/add', async (req, res) => {
    try {
        await SellerControllers.SellerAdd(req, res);
    }
    catch (err) {
    }
});

router.get('/all/:sellerId', async (req, res) => {
    try {
        await SellerControllers.GetAllProduct(req, res);
    }
    catch (err) {
    }
});

module.exports = router;
