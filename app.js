const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const morgan = require('morgan')

const productRoutes = require('./api/router/products');
const productCategoryRoutes = require('./api/router/product_category')

app.use(morgan('dev'))//logging
app.use(bodyParser.urlencoded({extended:false}))//body-parser urlencode
app.use(bodyParser.json())//body-parser json

//headers
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin','*')
	res.header('Access-Control-Allow-Headers','*')

	if(req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods','GET, POST, PUT, PATCH, DELETE')
		res.status(200).json({})
	}
	next()
})

// route middleware
app.use('/product', productRoutes)
app.use('/product-category', productCategoryRoutes)


// error handler
app.use((req, res, next) => {
	const error = new Error('Not Found')
	error.status = 404
	next(error)
})

app.use((error, req, res, next) => {
	res.status(error.status || 500)
	res.json({
		error: {
			message: error.message
		}
	})
})

module.exports = app