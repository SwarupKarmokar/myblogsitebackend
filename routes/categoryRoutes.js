const router = require('express').Router();
const { postCategory, getAllCat } = require('../controllers/categoryController');


router.route('/').post(postCategory).get(getAllCat)


module.exports = router;