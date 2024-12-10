const express = require('express');
const router = express.Router();
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
} = require('../../controllers/Product/Product');
const upload = require('../../middleware/Image/Image');
const PermissionAuthorize = require('../../middleware/Roles/Role');
const auth = require('../../middleware/Auth/auth');

router.post('/create',auth().authenticate(),PermissionAuthorize('product_add'),upload.single('image'),async (req, res) => {
    if (!req.body.image) {
      req.body.image = req.file ? req.file.path : null;
    }
    try {
      await createProduct(req, res);
    } catch (err) {}
  },
);

router.put('/update',auth().authenticate(),PermissionAuthorize('product_update'),async (req, res) => {
  try {
    await updateProduct(req, res);
  } catch (err) {}
});

router.delete('/delete',auth().authenticate(),PermissionAuthorize('product_delete'),async (req, res) => {
  try {
    await deleteProduct(req, res);
  } catch (err) {}
});

module.exports = router;
