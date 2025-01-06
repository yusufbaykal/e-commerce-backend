const mongoose = require('mongoose');
const Order = require('../db/models/Orders/Orders');
const Product = require('../db/models/Product/Product');

const getSellerStatistics = async (sellerId) => {
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        throw new Error('Invalid seller ID format');
    }

    const products = await Product.find({ seller_id: sellerId });
    const productIds = products.map(product => product._id);

    const orders = await Order.find({ 'items.product_id': { $in: productIds } });

    const totalSales = orders.reduce((acc, order) => {
        const orderTotal = order.items.reduce((sum, item) => sum + item.total_price, 0);
        return acc + orderTotal;
    }, 0);

    const totalOrders = orders.length;
    const averageOrderValue = totalOrders ? totalSales / totalOrders : 0;

    return {
        overview: {
            totalSales,
            totalOrders,
            averageOrderValue
        }
    };
};

const getProductPerformance = async (sellerId) => {
    if (!mongoose.Types.ObjectId.isValid(sellerId)) {
        throw new Error('Invalid seller ID format');
    }

    const products = await Product.find({ seller_id: sellerId });
    const productIds = products.map(product => product._id);

    const orders = await Order.find({ 'items.product_id': { $in: productIds } });

    const productPerformance = products.map(product => {
        const productOrders = orders.filter(order => order.items.some(item => item.product_id.equals(product._id)));
        const totalProductSales = productOrders.reduce((acc, order) => {
            const item = order.items.find(item => item.product_id.equals(product._id));
            return acc + (item ? item.total_price : 0);
        }, 0);
        return {
            productId: product._id,
            totalSales: totalProductSales,
            totalOrders: productOrders.length
        };
    });

    return productPerformance;
};

const getPerformanceMetrics = async (sellerId) => {
    const statistics = await getSellerStatistics(sellerId);
    const productPerformance = await getProductPerformance(sellerId);

    return {
        ...statistics,
        productPerformance
    };
};

module.exports = {
    getSellerStatistics,
    getProductPerformance,
    getPerformanceMetrics
};