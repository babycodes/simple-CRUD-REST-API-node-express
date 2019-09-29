const db = require('../mysql/db_config');

const get_all_products = ( req, res, next ) => {
	let selectAllProduct = `
		SELECT 
		p.id, 
		p.name, 
		c.name AS category, 
		p.price FROM product p
		INNER JOIN category c ON p.category = c.category_id
		GROUP BY p.id
		ORDER BY p.id DESC
	`
	db.query( selectAllProduct, ( err, result ) => {
		if( !err && result.length != null ){
			res.status( 200 ).json({
				message: 'product home get',
				product: result
			})
		} else {
			res.status( 404 ).json({
				message: err.sqlMessage
			})
		}
	});
}

const add_product = ( req, res, next ) => {
	
	db.query( "SELECT category_id from category" , ( err, result ) => {
		if( err ) {
			res.status(500).json({
				result: {
					error: 'please insert product category before insert the product'
				}
			})
		}else {

			const { name, description, category, price } = req.body
			let product = { name, description, category, price }

			let category_product_id = Object.values(result)
			let category_product = [];

			category_product = category_product_id.map( c => c.category_id)
			if(!category_product.includes(product.category)) {
				res.status( 404 ).json({
					result: {
						error: 'please input correct category'
					}
				})
			}else{
				let insertProductData = "INSERT INTO product SET ?"
				db.query(insertProductData, product, ( err, result ) => {
					if( !err ) {
						res.status( 200 ).json({
							result:{
								sucess: `data inserted ${ result.affectedRows }`,
								data: product
							}
						});
					}else {
						res.status( 500 ).json({
							result: {
								error: 'data failed insert to database'
							}
						})
					}
				})
			}
		}
	})
}

const detail_product = ( req, res, next ) => {
	let getDetailProduct = "SELECT * FROM product WHERE id = ?"
	db.query( getDetailProduct, req.params.productId, ( err, result ) => {
		if( !err && result.length === 1 ) {
			res.status( 200 ).json({
				result: {
					success: 'data found',
					product: result
				}
			})
		} else {
			res.status( 404 ).json({
				error: 'data not found'
			})
		}
	});
}

const update_product = ( req, res, next ) => {
	const { name, description, category, price } = req.body
	let product = { name, description, category, price }
	let updateProductData = "UPDATE product SET ? WHERE id = ?"
	db.query(updateProductData, [product, req.params.productId], ( err, result ) => {
		if(err) {
			res.status( 500 ).json({
				error: 'bad request'
			});
		} else {
			res.status( 200 ).json({
				result: {
					success: `data updated ${ result.affectedRows }`,
					data: product
				}
			})
		}
	})
}

const delete_product = ( req, res, next ) => {
	let deleteProduct = "DELETE FROM product WHERE id = ?"
	db.query( deleteProduct, req.params.productId, ( err, result ) => {
		if( err ) {
			res.status( 500 ).json({
				error: 'bad request'
			})
		}else {
			res.status( 200 ).json({
				result: {
					success: 'data deleted'
				}
			})
		}
	})
}

module.exports = {
	get_all_products,
	add_product,
	update_product,
	detail_product,
	delete_product
}