const express = require('express')
const router = express.Router()
const db = require('../mysql/db_config');
const ProductController = require('../controllers/product');

// get all product
router.get('/', ProductController.get_all_products);

// post a new product
router.post('/', ProductController.add_product);

// update a product
router.patch('/:productId', ProductController.update_product)

// show detail product
router.get('/:productId', ProductController.detail_product);

// delete product
router.delete('/:productId', ProductController.delete_product);

module.exports = router