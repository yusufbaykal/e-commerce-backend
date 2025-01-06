const express = require('express');
const Seller = require('../../db/models/Seller/Seller');
const Response = require('../../lib/Response');
const bcrypt = require('bcryptjs');
const Product = require('../../db/models/Product/Product');
const mongoose = require('mongoose');
const Orders = require('../../db/models/Orders/Orders');
const { AppError } = require('../../middleware/Error/errorHandler');
const { getSellerStatistics, getProductPerformance, getPerformanceMetrics } = require('../../statistics/SellerStatistics');

const SellerController = {
    GetAllProduct: async (req, res) => {
        try {
            const sellerId = req.params.sellerId;
            if (!mongoose.Types.ObjectId.isValid(sellerId)) {
                return res.status(400).json(Response.ErrorResponse(400, 'Invalid seller ID format', ''));
            }

            const AllProduct = await Product.find({ seller_id: sellerId });

            if (AllProduct.length === 0) {
                return res.status(404).json(Response.ErrorResponse(404, 'No products found for this seller', ''));
            }

            res.json(Response.SuccessResponse(200, 'All Products for Seller', AllProduct));
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json(Response.ErrorResponse(500, 'Get All Products for Seller Failed', err.message));
        }
    },

    GetAllOrder: async (req, res) => {
        try {
            const sellerId = req.params.sellerId;
            if (!mongoose.Types.ObjectId.isValid(sellerId)) {
                return res.status(400).json(Response.ErrorResponse(400, 'Invalid seller ID format', ''));
            }

            const products = await Product.find({ seller_id: sellerId });
            const productIds = products.map((product) => product._id);

            const orders = await Orders.find({'items.product_id': {$in: productIds }});

            if (orders.length === 0) {
                return res.status(404).json(Response.ErrorResponse(404, 'No orders found for this seller', ''));
            }

            res.json(Response.SuccessResponse(200, 'All Orders for Seller', orders));

        } catch (err) {
            console.error('Error:', err);
            res.status(500).json(Response.ErrorResponse(500, 'Get All Orders for Seller Failed', err.message));
        }
    },

    getStatistics: async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const statistics = await getSellerStatistics(sellerId);
            res.json({
                success: true,
                data: statistics
            });
        } catch (error) {
            next(new AppError('Satıcı istatistikleri alınamadı', 500));
        }
    },

    getPerformance: async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const performance = await getProductPerformance(sellerId);
            res.json({
                success: true,
                data: performance
            });
        } catch (error) {
            next(new AppError('Ürün performans bilgileri alınamadı', 500));
        }
    },

    getDailyMetrics: async (req, res, next) => {
        try {
            const sellerId = req.params.sellerId;
            const metrics = await getPerformanceMetrics(sellerId);
            res.json({
                success: true,
                data: metrics
            });
        } catch (error) {
            next(new AppError('Günlük metrikler alınamadı', 500));
        }
    }
};

module.exports = SellerController;
