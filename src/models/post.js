const db = require('./db')

async function getRelatedData(table, foreignKey, id) {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT * from ${table} WHERE ${foreignKey} = ?`, [id], (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

class Post {
    static async getAll({ withMedia = false, withComments = false, withLikes = false }) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * from posts ORDER BY created_at DESC', async (err, rows) => {
                if (err) {
                    return reject(err);
                }

                try {
                    for (let row of rows) {
                        if (withMedia) row.media = await getRelatedData('post_medias', 'post_id', row.id);
                        if (withComments) row.comments = await getRelatedData('comments', 'post_id', row.id);
                        if (withLikes) row.likes = await getRelatedData('likes', 'post_id', row.id);
                    }

                    resolve(rows);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    static async getById(id, { withMedia = false, withComments = false, withLikes = false }) {
        return new Promise((resolve, reject) => {
            db.execute('SELECT * from posts WHERE id = ?', [id], (err, rows) => {
                if (err)
                    reject(err);
                else
                    try {
                        if (rows.length === 0) return resolve(null);
                        let post = rows[0];
                        if (withMedia) post.media = getRelatedData('post_medias', 'post_id', post.id);
                        if (withComments) post.comments = getRelatedData('comments', 'post_id', post.id);
                        if (withLikes) post.likes = getRelatedData('likes', 'post_id', post.id);

                        resolve(post);
                    } catch (error) {
                        reject(error);
                    }
            });
        });
    }

    static async create({ title, description, user_id }) {
        return new Promise((resolve, reject) => {
            db.execute('INSERT INTO posts (title, description, user_id) VALUES (?, ?, ?)', [title, description, user_id], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    if (rows.affectedRows === 0)
                        reject(new Error('post not created'));
                    else
                        db.execute('SELECT * FROM posts WHERE id = ?', [rows.insertId], (err, rows) => {
                            if (err)
                                reject(err);
                            else
                                resolve(rows[0]);
                        });
                }
            });
        });
    }

    static async delete(id) {
        return new Promise((resolve, reject) => {
            db.execute('DELETE FROM posts WHERE id = ?', [id], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    if (rows.affectedRows === 0)
                        reject(new Error('post not found'));
                    else
                        resolve(true);
                }
            });
        });
    }

    static async update(id, { title, description }) {
        if (!title && !description) {
            throw new Error('At least one field is required');
        }

        return new Promise((resolve, reject) => {
            let query = 'UPDATE posts SET ';
            let fields = [];
            let values = [];
            if (title) {
                fields.push('title = ?');
                values.push(title);
            }
            if (description) {
                fields.push('description = ?');
                values.push(description);
            }
            query += fields.join(', ') + ' WHERE id = ?';
            db.execute(query, [...values, id], (err, rows) => {
                if (err)
                    reject(err);
                else {
                    if (rows.affectedRows === 0)
                        reject(new Error('post not found'));
                    else
                        db.execute('SELECT * FROM posts WHERE id = ?', [id], (err, rows) => {
                            if (err)
                                reject(err);
                            else
                                resolve(rows[0]);
                        });
                }
            });
        });
    }
}

module.exports = Post;