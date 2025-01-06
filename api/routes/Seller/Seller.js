const express = require('express');
const router = express.Router();
const SellerController = require('../../controllers/Seller/Seller');
const auth = require('../../middleware/Auth/auth');
const PermissionAuthorize = require('../../middleware/Roles/Role');

router.get('/:sellerId/products', auth().authenticate(), PermissionAuthorize('product_view_all'), SellerController.GetAllProduct);
router.get('/:sellerId/orders', auth().authenticate(), PermissionAuthorize('order_view'), SellerController.GetAllOrder);

router.get('/:sellerId/statistics', auth().authenticate(), PermissionAuthorize('seller_statistics_view'), SellerController.getStatistics);
router.get('/:sellerId/performance', auth().authenticate(), PermissionAuthorize('seller_performance_view'), SellerController.getPerformance);
router.get('/:sellerId/daily-metrics', auth().authenticate(), PermissionAuthorize('seller_daily_metrics_view'), SellerController.getDailyMetrics);

module.exports = router;