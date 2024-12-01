const express = require('express');
const router = express.Router();
const Product = require('../db/models/Product');
const Response = require('../lib/Response');
const { validateProduct,checkProductNameExists} = require('../controllers/product');


router.post('/create', async (req, res) => {
    const body = req.body;

    try {
        const validationError = validateProduct(body);
        if (validationError) {
            if (validationError.type === 'invalidFields') {
                return res.status(400).json(Response.ErrorResponse(400, "Invalid Fields", `Invalid fields: ${validationError.keys.join(', ')}`));
            }
            if (validationError.type === 'missingFields') {
                return res.status(400).json(Response.ErrorResponse(400, "Missing Fields", `Missing fields: ${validationError.keys.join(', ')}`));
            }
            
        }
        const productExists = await checkProductNameExists(body.name);
        if (productExists.exists) {
            return res.status(400).json(Response.ErrorResponse(400, "Product Exists", productExists.message));
        }

        const CreatedProduct = await Product.create({
            name: body.name,
            price: body.price,
            description: body.description,
            category: body.category,
            category_id: body.category_id,
            image: body.image,
            stock: body.stock,
            is_active: true
        });

        res.json(Response.SuccessResponse(200, "Created Product Successfully", CreatedProduct));
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(Response.ErrorResponse(500, 'Create Product Failed', err.message));
    }
}
);



module.exports = router;  