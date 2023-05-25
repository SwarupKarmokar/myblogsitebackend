const router = require('express').Router();
const { createPost, updatePost, deletePost, getPost, getAllPost } = require('../controllers/postController');


router.route('/').post(createPost).get(getAllPost)
router.route('/:id').put(updatePost).delete(deletePost).get(getPost)

module.exports = router;