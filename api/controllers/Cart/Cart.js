const express = require('express');
const router = express.Router();
const Cart = require('../../db/models/Cart');
const Product = require('../../db/models/Product');
const Response = require('../../lib/Response');

const  addCart = async (req, res) => {
    const {user_id, quantity, product_id} = req.body;

    try {

        const product = await Product.findById(product_id);
        if (!product) {
            return res.status(404).json(Response.ErrorResponse(404, "Product Not Found", "No product found with the provided id"));
        }

        const total_price = product.price * quantity;

        let cart = await Cart.findOne({user_id})
        if (!cart){
            cart = new Cart({
                user_id,
                items : [{product_id, quantity, total_price}]
            });
        } else {
            const exisitingItem = cart.items.findIndex(item => item.product_id === product_id);
            if (exisitingItem >= 0) {
                cart.items[exisitingItem].quantity += quantity;
                cart.items[exisitingItem].total_price = product.price * cart.items[exisitingItem].quantity;
            } else {
                cart.items.push({ product_id, quantity, total_price });
            }
        }

        await cart.save();
        res.json(Response.SuccessResponse(200, "Create Cart Successfully", cart));

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(Response.ErrorResponse(500, 'Create Cart Failed', err.message));
    }
};

module.exports = {addCart};