const router = require('express').Router();
const { updateUser, deleteUser, getUser } = require('../controllers/userController');


// GET AND UPDATE AND DELETE USER 
router.route('/:id').put(updateUser).delete(deleteUser).get(getUser)




module.exports = router;