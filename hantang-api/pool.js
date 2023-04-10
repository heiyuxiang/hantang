const mysql = require('mysql')
const pool = mysql.createPool({
	host:'127.0.0.1',
	port:'3307',
	user:'root',
	password:'',
	database:'hantang',
	connectionLimit:15,
	multipleStatements:true
})
module.exports = pool