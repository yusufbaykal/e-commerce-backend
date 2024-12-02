const express = require('express');
const router = express.Router();
const Category = require('../db/models/Category');
const Response = require('../lib/Response');
const { validateCategory } = require('../controllers/category');

router.post('/create', async (req, res) => {
    const body = req.body;

    try {
        const validationError = validateCategory(body);
        if (validationError) {
            if (validationError.type === 'invalidFields') {
                return res.status(400).json(Response.ErrorResponse(400, "Invalid Fields", `Invalid fields: ${validationError.keys.join(', ')}`));
            }
            if (validationError.type === 'missingFields') {
                return res.status(400).json(Response.ErrorResponse(400, "Missing Fields", `Missing fields: ${validationError.keys.join(', ')}`));
            }
        }
        const CreatedCategory = await Category.create({
            name: body.name,
            is_active: true
        });

        res.json(Response.SuccessResponse(200, "Created Category Successfully", CreatedCategory));
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(Response.ErrorResponse(500, 'Create Category Failed', err.message));
    }
});

router.put('/update', async (req, res) => {
    const body = req.body;
    try {
        if (!body.id) {
            return res.status(400).json(Response.ErrorResponse(400, "Missing Fields", "Missing field: id"));
        }

        const UpdatedCategory = await Category.findByIdAndUpdate(body.id, {
            name: body.name,
            is_active: body.is_active
        }, { new: true });

        if (!UpdatedCategory) {
            return res.status(404).json(Response.ErrorResponse(404, "Category Not Found", "No category found with the provided id"));
        }

        res.json(Response.SuccessResponse(200, "Updated Category Successfully", UpdatedCategory));

    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(Response.ErrorResponse(500, 'Update Category Failed', err.message));
    }
});

router.delete('/delete', async (req, res) => {
    const body = req.body;
    try {
        if (!body.id) {
            return res.status(400).json(Response.ErrorResponse(400, "Missing Fields", "Missing field: id"));
        }

        const DeletedCategory = await Category.findByIdAndDelete(body.id);

        if (!DeletedCategory) {
            return res.status(404).json(Response.ErrorResponse(404, "Category Not Found", "No category found with the provided id"));
        }

        res.json(Response.SuccessResponse(200, "Deleted Category Successfully", DeletedCategory));
        
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json(Response.ErrorResponse(500, 'Delete Category Failed', err.message));
    }
}
);

module.exports = router;
