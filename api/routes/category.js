const express = require('express');
const router = express.Router();
const { createCategory, updateCategory, deleteCategory } = require('../controllers/Category/Category');

router.post('/create', async (req, res) => {
    try {
        await createCategory(req, res);
    }
    catch (err) {
    }
});

router.put('/update', async (req, res) => {
    try {
        await updateCategory(req, res);
    }
    catch (err) {
    }
});

router.delete('/delete', async (req, res) => {
    try {
        await deleteCategory(req, res);
    }
    catch (err) {
    }
});

module.exports = router;
