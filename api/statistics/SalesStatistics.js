const OrderModel = require('../db/models/Orders/Orders');

const getOverallSalesStatistics = async (startDate, endDate) => {
    return await OrderModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$totalAmount' },
                orderCount: { $sum: 1 },
                averageOrderValue: { $avg: '$totalAmount' }
            }
        }
    ]);
};

const getSalesByCategory = async (startDate, endDate) => {
    return await OrderModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            $unwind: '$items'
        },
        {
            $lookup: {
                from: 'products',
                localField: 'items.product_id',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: '$product'
        },
        {
            $group: {
                _id: '$product.category',
                totalRevenue: { $sum: '$items.total_price' },
                orderCount: { $sum: 1 }
            }
        }
    ]);
};

const getTopSellingProducts = async (limit = 10) => {
    return await OrderModel.aggregate([
        {
            $unwind: '$items'
        },
        {
            $group: {
                _id: '$items.product_id',
                totalSold: { $sum: '$items.quantity' },
                totalRevenue: { $sum: '$items.total_price' }
            }
        },
        {
            $sort: { totalSold: -1 }
        },
        {
            $limit: limit
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'product'
            }
        },
        {
            $unwind: '$product'
        },
        {
            $project: {
                _id: 0,
                productId: '$_id',
                name: '$product.name',
                totalSold: 1,
                totalRevenue: 1
            }
        }
    ]);
};

const getDailySalesReport = async (startDate, endDate) => {
    return await OrderModel.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $lte: endDate
                }
            }
        },
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' },
                    month: { $month: '$createdAt' },
                    day: { $dayOfMonth: '$createdAt' }
                },
                totalSales: { $sum: '$totalAmount' },
                orderCount: { $sum: 1 }
            }
        },
        {
            $sort: {
                '_id.year': 1,
                '_id.month': 1,
                '_id.day': 1
            }
        }
    ]);
};

module.exports = {
    getOverallSalesStatistics,
    getSalesByCategory,
    getTopSellingProducts,
    getDailySalesReport
}; 