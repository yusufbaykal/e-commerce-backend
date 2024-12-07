const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts, getProductById } = require('../controllers/Product/Product');

router.post('/create', async (req, res) => {
    try {
        await createProduct(req, res);
    }
    catch (err) {
    }    
});

router.put('/update', async (req, res) => {
    try {
        await updateProduct(req, res);
    }
    catch (err) {
    }    
});

router.delete('/delete', async (req, res) => {
    try {
        await deleteProduct(req, res);
    }
    catch (err) {
    }    
});

module.exports = router;  