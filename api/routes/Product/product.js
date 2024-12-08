const express = require('express');
const router = express.Router();
const { createProduct, updateProduct, deleteProduct, getProducts, getProductById } = require('../../controllers/Product/Product');
const upload = require('../../middleware/Image/Image');

router.post('/create',upload.single('image'),async (req, res) => {
    console.log("body",req.body);
    console.log("file",req.file);
    
    if (!req.body.image) {
        req.body.image = req.file ? req.file.path : null;
    }
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