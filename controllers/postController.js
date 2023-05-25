const asyncHandler = require('express-async-handler');
const Post = require('../models/postSchema')


// CREATE POST 
const createPost = asyncHandler(async (req, res) => {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.json(savedPost)
})

//UPDATE POST 
const updatePost = asyncHandler(async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.params.id);
    if (post.username === req.body.username) {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true })

        res.json(updatedPost)
    }
    else {
        res.status(401).json("You not allow to update other post")
    }
})

// DELETE POST 
const deletePost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
        await Post.findByIdAndDelete(req.params.id)
        res.json("post deleted successfully")
    }
    else {
        res.status(401).json("you can't delete other post")
    }
})

//GET POST
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.json(post)
})

//GET ALL POST 
const getAllPost = asyncHandler(async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;

    let posts;
    if (username) {
        posts = await Post.find({ username })
    }
    else if (catName) {
        posts = await Post.find({
            categories: {
                $in: [catName]
            }
        })
    }
    else {
        posts = await Post.find()
    }

    res.json(posts)
})



module.exports = { createPost, updatePost, deletePost, getPost, getAllPost }