import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

function getDatabaseConnection() {
    try {
        const db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT
        });

        return db;
    } catch (err) {
        console.error('Error connecting to the database: ', err);
        return null;
    }
}

const db = getDatabaseConnection();

if (!db) {
    process.exit(1);
}

db.config.namedPlaceholders = true;

module.exports = db;