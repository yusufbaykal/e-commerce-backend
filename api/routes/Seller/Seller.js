const express = require('express');
const router = express.Router();
const SellerControllers = require('../../controllers/Seller/Seller');
const PermissionAuthorize = require('../../middleware/Roles/Role');
const auth = require('../../middleware/Auth/auth');


router.post('/add',auth().authenticate(),PermissionAuthorize('ALL'),async (req, res) => {
  try {
    await SellerControllers.SellerAdd(req, res);
  } catch (err) {}
});

router.get('/all/:sellerId',auth().authenticate(),PermissionAuthorize('product_view_all'), async (req, res) => {
  try {
    await SellerControllers.GetAllProduct(req, res);
  } catch (err) {}
});

router.get('/order/all/:sellerId',auth().authenticate(),PermissionAuthorize('order_view'), async (req, res) => {
  try {
    await SellerControllers.GetAllOrder(req, res);
  }
  catch (err) {}
  
});

module.exports = router;
