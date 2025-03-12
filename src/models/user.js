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
        if (!id) {
            throw new Error('id is required');
        }

        return new Promise((resolve, reject) => {
            db.execute('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        });
    }

    static async getByEmail(email) {
        if (!email) {
            throw new Error('Email is required');
        }

        return new Promise((resolve, reject) => {
            db.execute('SELECT username, email, password, role FROM users WHERE email = ?', [email], (err, rows) => {
                if(err)
                    reject(err);
                else
                    resolve(rows[0]);
            });
        });
    }

    static async create(username, email, password) {
        if (!username || !email || !password) {
            throw new Error('All fields are required');
        }

        password = bcrypt.hashSync(password, 10);

        return new Promise((resolve, reject) => {
            db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, rows) => {
                if(err)
                    reject(err);
                else {
                    if (rows.affectedRows === 0)
                        reject(new Error('user not created'));
                    else
                        db.execute('SELECT id, username FROM users WHERE id = ?', [rows.insertId], (err, rows) => {
                            if(err)
                                reject(err);
                            else
                                resolve(rows[0]);
                        });
                }
            });
        });
    }

    // username, email and password are optional
    static async update(id, { username, email, password }) {
        if (!id) {
            throw new Error('id is required');
        }

        if (!username && !email && !password) {
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

            if (password) {
                password = bcrypt.hashSync(password, 10);
                fields.push('password = ?');
                values.push(password);
            }

            query += fields.join(', ') + ' WHERE id = ?';
            values.push(id);

            db.execute(query, values, (err, result) => {
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
        if (!id) {
            throw new Error('id is required');
        }

        return new Promise((resolve, reject) => {
            db.execute('DELETE FROM users WHERE id = ?', [id], (err, rows) => {
                if(err)
                    reject(err);
                else {
                    if (rows.affectedRows === 0)
                        reject(new Error('user not found'));
                    else
                        resolve(rows);
                }
            });
        });
    }
}

module.exports = User;