const db = require('../mysql/db_config');

const get_all_products = (req, res, next) => {
	let sql = "SELECT * FROM product"
	db.query(sql, (err, result) => {
		if(!err){
			res.status(200).json({
				message: 'product home get',
				product: result
			})
		} else {
			res.status(404).json({
				message: err.sqlMessage
			})
		}
	});
}

const add_product = (req, res, next) => {
	const {name, description, category, price} = req.body
	let product = {name, description, category, price}
	let sql = "INSERT INTO product SET ?"
	db.query(sql, product, (err, result) => {
		if(!err) {
			res.status(200).json({
				message: 'data product berhasil di input',
				data: result
			});
		} else {
			res.status(500).json({
				message: 'bad request'
			})
		}
	})
}

const detail_product = (req, res, next) => {
	let sql = "SELECT * FROM product WHERE id = ?"
	db.query(sql, req.params.productId, (err, result) => {
		if(!err && result.length === 1) {
			res.status(200).json({
				message: 'data found',
				data: result
			})
		} else {
			res.status(404).json({
				message: 'data not found'
			})
		}
	});
}

const update_product = (req, res, next) => {
	const {name, description, category, price} = req.body
	let product = {name, description, category, price}
	let sql = "UPDATE product SET ? WHERE id = ?"
	db.query(sql, [product, req.params.productId], (err, result) => {
		if(err) {
			res.status(500).json({
				message: 'bad request'
			});
		} else {
			res.status(200).json({
				message: 'data behasil di update',
				data: product,
				success: result.affectedRows
			})
		}
	})
}

const delete_product = (req, res, next) => {
	let sql = "DELETE FROM product WHERE id = ?"
	db.query(sql, req.params.productId, (err, result) => {
		if(err) {
			res.status(500).json({
				message: 'bad request'
			})
		} else {
			res.status(200).json({
				message: 'data deleted'
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