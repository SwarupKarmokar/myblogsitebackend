const asyncHandler = require('express-async-handler');
const Category = require('../models/categorySchema');

// CREATING POST
const postCategory = asyncHandler(async (req, res) => {
    const newCat = new Category(req.body);
    const savedCat = await newCat.save()
    res.json(savedCat)
})

// GET ALL CATEGORY
const getAllCat = asyncHandler(async (req, res) => {
    const cats = await Category.find()
    res.json(cats)
})


module.exports = { postCategory, getAllCat }