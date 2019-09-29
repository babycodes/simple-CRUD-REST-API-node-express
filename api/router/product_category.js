const express = require('express')
const router = express.Router()
const productCategoryController = require('../controllers/product_category')


router.get('/', productCategoryController.getAllProductCategory)

router.post('/', productCategoryController.insertProductCategory)

module.exports = router