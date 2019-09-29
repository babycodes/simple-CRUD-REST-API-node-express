// import ||  required database configuration
const db = require('../mysql/db_config')


/*
* product_category controller
* get all product category from product table
*
* @function getAllProductCategory
* @params ( req, res, next )
* @return all product category
*/

const getAllProductCategory =  ( req, res, next ) => {
	let getAllProductCategory = 'SELECT category_id, name FROM category'
	db.query(getAllProductCategory, ( err, result ) => {
		if(err) {
			res.status(404).json({
				message: 'not found'
			});
		}else {
			res.status(200).json({
				message: 'get all product category',
				product_category : result
			});
		}
	});
}

const insertProductCategory = ( req, res, next ) => {
	const { category_id, name } = req.body
	const product_category = { category_id, name }
	let insertProductCategory = "INSERT INTO category SET ?"
	db.query( insertProductCategory, product_category, ( err, result ) => {
		if(err) {
			res.status( 500 ).json({
				result: {
					error: `bad request error ${ err }`
				}
			})
		} else {
			res.status( 200 ).json({
				result: {
					success: `data product inserted ${ result.affectedRows }`,
					data: product_category
				}
			})
		}
	})
}

module.exports  = {
	getAllProductCategory,
	insertProductCategory
}