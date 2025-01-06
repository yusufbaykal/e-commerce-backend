const express = require('express');
const router = express.Router();
const UserControllers = require('../../controllers/Users/Users');
const auth = require('../../middleware/Auth/auth');

router.get('/login', async (req, res) => {
  try {
    await UserControllers.userLogin(req, res);
  } catch (err) {}
});

router.get('/me', auth, async (req, res) => {
  try {
    await UserControllers.userMe(req, res);
  } catch (err) {}
});

router.post('/register', async (req, res) => {
  try {
    await UserControllers.registerUser(req, res);
  } catch (err) {}
});

router.put('/update', async (req, res) => {
  try {
    await UserControllers.updateUser(req, res);
  } catch (err) {}
});

router.delete('/delete', async (req, res) => {
  try {
    await UserControllers.deleteUser(req, res);
  } catch (err) {}
});

module.exports = router;
