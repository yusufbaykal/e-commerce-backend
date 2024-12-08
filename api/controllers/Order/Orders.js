const express = require('express');
const router = express.Router();
const Orders = require('../../db/models/Orders');
const Response  = require('../../lib/Response');

const OrderAdd = async (req, res) => {
    let body = req.body;
    try {

        const CreatedOrder = await Orders.create({
            user_id: body.user_id,
            status: body.status,
            shipping_address:{
                street: body.shipping_address.street,
                city: body.shipping_address.city,
                state: body.shipping_address.state,
                zip: body.shipping_address.zip,
                country: body.shipping_address.country
            },
            is_active: true,
            items: {
                product_id: body.items.product_id,
                quantity: body.items.quantity,
                total_price: body.items.total_price
            },
        });

        res.json(Response.SuccessResponse(200, "Created Order Successfully", CreatedOrder));
    }
    catch (err) {
        console.error("Error:", err);
        res.status(500).json(Response.ErrorResponse(500, 'Create Order Failed', err.message));
    }
};

module.exports = {OrderAdd};  