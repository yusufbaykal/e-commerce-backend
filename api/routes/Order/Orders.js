const express = require('express');
const router = express.Router();
const OrdersControllers = require('../../controllers/Order/Orders');

router.post('/add', async (req, res) => {
  try {
    await OrdersControllers.OrderAdd(req, res);
  } catch (error) {}
});

module.exports = router;
