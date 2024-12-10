const express = require('express');
const Seller = require('../../db/models/Seller/Seller');
const Response = require('../../lib/Response');
const bcrypt = require('bcrypt-nodejs');
const Product = require('../../db/models/Product/Product');
const mongoose = require('mongoose');
const Orders = require('../../db/models/Orders/Orders');

const SellerAdd = async (req, res) => {
  let body = req.body;
  try {
    let password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(10), null);
    const CreatedSeller = await Seller.create({
      name: body.name,
      email: body.email,
      phone: body.phone,
      password: password,
      is_verified: false,
      store_name: body.store_name,
      address: {
        street: body.address.street,
        city: body.address.city,
        state: body.address.state,
        zip: body.address.zip,
        country: body.address.country,
      },
      is_active: true,
      roles: 'SELLER',
    });

    res.json(Response.SuccessResponse(200, 'Created Seller Successfully', CreatedSeller));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Create Seller Failed', err.message));
  }
};

const GetAllProduct = async (req, res) => {
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
};

const GetAllOrder = async (req, res) => {
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

  }
  catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Get All Orders for Seller Failed', err.message));
  }
};

module.exports = { SellerAdd, GetAllProduct, GetAllOrder };
