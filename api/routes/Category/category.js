const express = require('express');
const router = express.Router();
const { createCategory, updateCategory, deleteCategory } = require('../../controllers/Category/Category');
const PermissionAuthorize = require('../../middleware/Roles/Role');
const auth = require('../../middleware/Auth/auth');



router.post('/create', auth().authenticate(),PermissionAuthorize("category_add"),async (req, res) => {
  try {
    await createCategory(req, res);
  } catch (err) {}
});

router.put('/update',auth().authenticate(),PermissionAuthorize("category_update"), async (req, res) => {
  try {
    await updateCategory(req, res);
  } catch (err) {}
});

router.delete('/delete',auth().authenticate(),PermissionAuthorize("category_delete"),async (req, res) => {
  try {
    await deleteCategory(req, res);
  } catch (err) {}
});

module.exports = router;
