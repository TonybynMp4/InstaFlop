const db = require('./db')

async function getRelatedData(table, id) {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT *, created_at AS createdAt FROM ${table} WHERE post_id = ?`, [id], (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function getComments(postId) {
	return new Promise((resolve, reject) => {
		const query = `
			SELECT post.*, user.displayname, user.profile_picture
			FROM comments AS post
			LEFT JOIN users AS user
			ON post.user_id = user.id
			WHERE post.post_id = ?
			ORDER BY post.created_at DESC
		`;

		db.execute(query, [postId], (err, data) => {
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
                        if (withMedia) row.media = await getRelatedData('post_medias', row.id);
                        if (withLikes) row.likes = await getRelatedData('likes', row.id);
                        if (withComments) row.comments = await getComments(row.id);
                    }

                    resolve(rows);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

	static async getFeed({ withMedia = false, withComments = false, withLikes = false, authUserId }) {
		if (!authUserId) {
			throw new Error('authUserId is required');
		}

		const query = `
			SELECT post.*, user.displayname, user.profile_picture
			FROM posts AS post
			LEFT JOIN users AS user
			ON post.user_id = user.id
			WHERE post.user_id IN (
				SELECT following_id FROM followers WHERE follower_id = ?
			)
			OR post.user_id = ?
			ORDER BY post.created_at DESC
		`;

		return new Promise((resolve, reject) => {
			db.query(query, [authUserId, authUserId], async (err, rows) => {
                if (err) {
                    return reject(err);
                }

                try {
                    for (let row of rows) {
                        if (withMedia) row.media = await getRelatedData('post_medias', row.id);
                        if (withLikes) row.likes = await getRelatedData('likes', row.id);
                        if (withComments) row.comments = await getComments(row.id);
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
                        if (withMedia) post.media = getRelatedData('post_medias', post.id);
                        if (withComments) post.comments = getRelatedData('comments', post.id);
                        if (withLikes) post.likes = getRelatedData('likes', post.id);

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