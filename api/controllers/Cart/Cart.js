const express = require('express');
const router = express.Router();
const Cart = require('../../db/models/Cart');
const Product = require('../../db/models/Product');
const Response = require('../../lib/Response');

const addCart = async (req, res) => {
  const { user_id, quantity, product_id } = req.body;

  try {
    const product = await Product.findById(product_id);
    if (!product) {
      return res
        .status(404)
        .json(Response.ErrorResponse(404, 'Product Not Found', 'No product found with the provided id'));
    }

    const total_price = product.price * quantity;

    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      cart = new Cart({
        user_id,
        items: [{ product_id, quantity, total_price }],
      });
    } else {
      const existingItem = cart.items.findIndex((item) => item.product_id.toString() === product_id);
      if (existingItem >= 0) {
        cart.items[existingItem].quantity += quantity;
        cart.items[existingItem].total_price = product.price * cart.items[existingItem].quantity;
      } else {
        cart.items.push({ product_id, quantity, total_price });
      }
    }

    await cart.save();
    res.json(Response.SuccessResponse(200, 'Create Cart Successfully', cart));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Failed to Update Cart', err.message));
  }
};

const updateCart = async (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  try {
    const product = await Product.findById(product_id);
    if (!product) {
      return res
        .status(404)
        .json(Response.ErrorResponse(404, 'Product Not Found', 'No product found with the provided id'));
    }

    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res
        .status(404)
        .json(Response.ErrorResponse(404, 'Cart Not Found', 'No cart found for the specified user'));
    }

    const itemIndex = cart.items.findIndex((item) => item.product_id.toString() === product_id);
    if (itemIndex === -1) {
      return res
        .status(404)
        .json(Response.ErrorResponse(404, 'Item Not Found', 'The specified product is not in the cart'));
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].total_price = product.price * quantity;
    }

    await cart.save();
    res.status(200).json(Response.SuccessResponse(200, 'Cart Updated Successfully', cart));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Failed to Update Cart', err.message));
  }
};

const deleteCart = async (req, res) => {
  const { user_id, product_id } = req.body;

  try {
    let cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res
        .status(404)
        .json(Response.ErrorResponse(404, 'Cart Not Found', 'No cart found for the specified user'));
    }

    const itemIndex = cart.items.findIndex((item) => item.product_id.toString() === product_id);
    if (itemIndex === -1) {
      return res
        .status(404)
        .json(Response.ErrorResponse(404, 'Item Not Found', 'The specified product is not in the cart'));
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json(Response.SuccessResponse(200, 'Item Removed Successfully', cart));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Failed to Remove Item', err.message));
  }
};

const getCart = async (req, res) => {
  const { user_id } = req.body;

  try {
    const cart = await Cart.findOne({ user_id });
    if (!cart) {
      return res
        .status(404)
        .json(Response.ErrorResponse(404, 'Cart Not Found', 'No cart found for the specified user'));
    }

    res.status(200).json(Response.SuccessResponse(200, 'Cart Retrieved Successfully', cart));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Failed to Retrieve Cart', err.message));
  }
};

module.exports = { addCart, updateCart, deleteCart, getCart };
