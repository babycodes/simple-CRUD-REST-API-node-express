const mysql = require('mysql')

const db = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'pembelian',
	debug: false
});

db.getConnection((err) => {
	if(err) throw err
	console.log('connected')
});

module.exports = db