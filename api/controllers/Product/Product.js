const express = require('express');
const Product = require('../../db/models/Product');
const Response = require('../../lib/Response');
const { validateProduct, checkProductNameExists } = require('../../helpers/Product/Product');

const createProduct = async (req, res) => {
  const body = req.body;

  try {
    const validationError = validateProduct(body);
    if (validationError) {
      if (validationError.type === 'invalidFields') {
        return res
          .status(400)
          .json(Response.ErrorResponse(400, 'Invalid Fields', `Invalid fields: ${validationError.keys.join(', ')}`));
      }
      if (validationError.type === 'missingFields') {
        return res
          .status(400)
          .json(Response.ErrorResponse(400, 'Missing Fields', `Missing fields: ${validationError.keys.join(', ')}`));
      }
    }
    const productExists = await checkProductNameExists(body.name);
    if (productExists.exists) {
      return res.status(400).json(Response.ErrorResponse(400, 'Product Exists', productExists.message));
    }

    const image_file = req.file ? req.file.path : null;

    const CreatedProduct = await Product.create({
      name: body.name,
      price: body.price,
      description: body.description,
      category: body.category,
      category_id: body.category_id,
      image: image_file,
      stock: body.stock,
      is_active: true,
      seller_id: body.seller_id,
    });

    res.json(Response.SuccessResponse(200, 'Created Product Successfully', CreatedProduct));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Create Product Failed', err.message));
  }
};

const updateProduct = async (req, res) => {
  const body = req.body;
  try {
    if (!body.id) {
      return res.status(400).json(Response.ErrorResponse(400, 'Missing Fields', 'Missing field: id'));
    }

    const image = req.file ? req.file.path : null;

    const UpdatedProduct = await Product.findByIdAndUpdate(
      body.id,
      {
        name: body.name,
        price: body.price,
        description: body.description,
        category: body.category,
        category_id: body.category_id,
        image: image,
        stock: body.stock,
        is_active: body.is_active,
        seller_id: body.seller_id,
      },
      { new: true },
    );

    if (!UpdatedProduct) {
      return res
        .status(404)
        .json(Response.ErrorResponse(404, 'Product Not Found', 'No product found with the provided id'));
    }

    res.json(Response.SuccessResponse(200, 'Updated Product Successfully', UpdatedProduct));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Update Product Failed', err.message));
  }
};

const deleteProduct = async (req, res) => {
  const body = req.body;
  try {
    if (!body.id) {
      return res.status(400).json(Response.ErrorResponse(400, 'Missing Fields', 'Missing field: id'));
    }

    const DeletedProduct = await Product.findByIdAndDelete(body.id);

    if (!DeletedProduct) {
      return res
        .status(404)
        .json(Response.ErrorResponse(404, 'Product Not Found', 'No product found with the provided id'));
    }

    res.json(Response.SuccessResponse(200, 'Deleted Product Successfully'));
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json(Response.ErrorResponse(500, 'Delete Product Failed', err.message));
  }
};

module.exports = { createProduct, updateProduct, deleteProduct };
