const express = require('express');
const router = express.Router();
const PaymentControllers = require('../../controllers/Payment/Payment');


router.post('/add', async (req, res) => {
    try {
        await PaymentControllers.PaymentAdd(req, res);
    }
    catch (err) {
    }
});

module.exports = router;

