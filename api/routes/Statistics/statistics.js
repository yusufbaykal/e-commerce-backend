const express = require('express');
const router = express.Router();
const { 
    getOverallSalesStatistics, 
    getSalesByCategory, 
    getTopSellingProducts, 
    getDailySalesReport 
} = require('../../statistics/SalesStatistics');
const { AppError } = require('../../middleware/Error/errorHandler');
const auth = require('../../middleware/Auth/auth');
const PermissionAuthorize = require('../../middleware/Roles/Role');

router.get('/overall', auth().authenticate(), PermissionAuthorize('statistics_view'), async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const statistics = await getOverallSalesStatistics(
            new Date(startDate || new Date().setMonth(new Date().getMonth() - 1)),
            new Date(endDate || new Date())
        );
        res.json({
            success: true,
            data: statistics
        });
    } catch (error) {
        next(new AppError('Genel satış istatistikleri alınamadı', 500));
    }
});

router.get('/by-category', auth().authenticate(), PermissionAuthorize('statistics_view'), async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const statistics = await getSalesByCategory(
            new Date(startDate || new Date().setMonth(new Date().getMonth() - 1)),
            new Date(endDate || new Date())
        );
        res.json({
            success: true,
            data: statistics
        });
    } catch (error) {
        next(new AppError('Kategoriye göre satış istatistikleri alınamadı', 500));
    }
});

router.get('/top-products', auth().authenticate(), PermissionAuthorize('statistics_view'), async (req, res, next) => {
    try {
        const { limit } = req.query;
        const statistics = await getTopSellingProducts(parseInt(limit) || 10);
        res.json({
            success: true,
            data: statistics
        });
    } catch (error) {
        next(new AppError('En çok satan ürünler alınamadı', 500));
    }
});

router.get('/daily-report', auth().authenticate(), PermissionAuthorize('statistics_view'), async (req, res, next) => {
    try {
        const { startDate, endDate } = req.query;
        const report = await getDailySalesReport(
            new Date(startDate || new Date().setDate(new Date().getDate() - 30)),
            new Date(endDate || new Date())
        );
        res.json({
            success: true,
            data: report
        });
    } catch (error) {
        next(new AppError('Günlük satış raporu alınamadı', 500));
    }
});

module.exports = router;