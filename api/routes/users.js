var express = require('express');
var router = express.Router();
var Users = require('../db/models/Users');
const { validateUsers, checkUserEmailExists, checkEmailControl} = require('../controllers/users');


router.post('/register', async (req, res) => {
  try {
    let body = req.body;
    const emailControl = await checkEmailControl(body.email);
    if (!emailControl.exists) {
      return res.status(400).json({
        status: 400,
        message: "Email is not valid",
        error: emailControl.message,
      });
    }
    const validationError = validateUsers(body);
    if (validationError) {
      if (validationError.type === 'invalidFields') {
        return res.status(400).json({
          status: 400,
          message: "Invalid Fields",
          error: `Invalid fields: ${validationError.keys.join(', ')}`
        });
      }
      if (validationError.type === 'missingFields') {
        return res.status(400).json({
          status: 400,
          message: "Missing Fields",
          error: `Missing fields: ${validationError.keys.join(', ')}`
        });
      }
    }
    const emailExists = await checkUserEmailExists(body.email);
    if (emailExists.exists) {
      return res.status(400).json({
        status: 400,
        message: "Email Exists",
        error: emailExists.message
      });
    }

    let CreatedUsers = await Users.create({
      email: body.email,
      password: body.password,
      is_active: true,
      first_name: body.first_name,
      last_name: body.last_name,
      phone_number: body.phone_number,
      adres: {
        street: body.adres.street,
        city: body.adres.city,
        state: body.adres.state,
        zip: body.adres.zip,
        country: body.adres.country
      }
    });

    res.json({ status: 200, message: "Created Users Successfully" });

  } catch (err) {
    console.error("Error:", err); 
    return res.status(404).json({
      status: 404,
      message: 'Create Users Failed',
      error: err.message
    });
  }
});



router.put('/update', async (req, res) => {
  let body = req.body;
  try {
    const emailControl = await checkEmailControl(body.email);
    if (!emailControl.exists) {
      return res.status(400).json({
        status: 400,
        message: "Email is not valid",
        error: emailControl.message,
      });
    }
    let updatedUser = await Users.updateOne(
      { email: body.email },
      {
        $set: {
          password: body.password,
          is_active: body.is_active,
          first_name: body.first_name,
          last_name: body.last_name,
          phone_number: body.phone_number,
          adres: {
            street: body.adres.street,
            city: body.adres.city,
            state: body.adres.state,
            zip: body.adres.zip,
            country: body.adres.country
          }
        }
      }
    );

    if (updatedUser.nModified === 0) {
      return res.status(404).json({status: 404,message: 'User not found or no changes made',});
    }

    res.json({status: 200,message: "User updated successfully"});
  } 
  
  catch (err) {
    console.error("Error:", err);
    return res.status(500).json({status: 500,message: 'Update User Failed',error: err.message});
  }
});


router.delete('/delete', async (req, res) => {
  let body = req.body;
  try {
    let deletedUser = await Users.deleteOne({ email: body.email });
    if (deletedUser.deletedCount === 0) {
      return res.status(404).json({status: 404,message: 'User not found',});
    }
    res.json({status: 200,message: "User deleted successfully"});
  } catch (err) {
    console.error("Error:", err);
    return res.status(500).json({status: 500,message: 'Delete User Failed',error: err.message});
  }
}
);


module.exports = router;
