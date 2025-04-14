const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();

function createDatabasePool() {
    try {
		console.log(
			'host:', process.env.DB_HOST,
            '\nuser:', process.env.DB_USER,
            '\npassword:', process.env.DB_PASSWORD,
            '\ndatabase:', process.env.DB_NAME,
            '\nport:', process.env.DB_PORT,
		);
		const db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
			ssl: {
				ca: fs.readFileSync(__dirname + '../../../singlestore_certificate.pem')
			},
            waitForConnections: true,
            connectionLimit: 50,
            queueLimit: 1000,
            namedPlaceholders: true
        });

        return db;
    } catch (err) {
        console.error('Error connecting to the database: ', err);
    }
}

const db = createDatabasePool();

if (!db) {
    process.exit(1);
}

module.exports = db;