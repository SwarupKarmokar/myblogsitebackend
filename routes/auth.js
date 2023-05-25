const router = require('express').Router();

// IMPORTING USER FUNCTION FROM USER CONTROLLER 
const { registerUser, loginUser } = require('../controllers/authController')

// CREATING ALL ROUTES FOR USER 
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;