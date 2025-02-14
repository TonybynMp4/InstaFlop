const db = require('./db')
const bcrypt = require('bcrypt');

class User {
    static async getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * from users', (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    static async getById(id) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        });
    }

    static async getByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM users WHERE email = ?', [email], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        });
    }

    static async create({ username, email, password }) {
        password = bcrypt.hashSync(password, 10);

        return new Promise((resolve, reject) => {
            db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?) RETURNING *', [username, email, password], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }

    // username and email are optional
    static async update(id, { username, email }) {
        if (!username && !email) {
            throw new Error('At least one field is required');
        }

        return new Promise((resolve, reject) => {
            let query = 'UPDATE users SET ';
            let fields = [];
            let values = [];

            if (username) {
                fields.push('username = ?');
                values.push(username);
            }

            if (email) {
                fields.push('email = ?');
                values.push(email);
            }

            query += fields.join(', ') + ' WHERE id = ?';
            values.push(id);

            db.query(query, values, (err, result) => {
                if(err)
                    return reject(err);

                if(result.affectedRows === 0) {
                    return reject(new Error('user not found'));
                }

                resolve(result);
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.query('DELETE FROM users WHERE id = ? RETURNING *', [id], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        });
    }
}

module.exports = User;