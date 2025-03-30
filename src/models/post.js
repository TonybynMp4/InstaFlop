const db = require('./db');
const PostMedia = require('./postMedia');
const { getComments, getLiked, getMedias, getLikes } = require('./postUtils');

class Post {
    static async getAll({ withMedia = false, withComments = false, withLikes = false }) {
        return new Promise((resolve, reject) => {
            db.query('SELECT * from posts ORDER BY created_at DESC', async (err, rows) => {
                if (err) {
                    return reject(err);
                }

                try {
                    for (let row of rows) {
                        if (withMedia) row.media = await getMedias(row.id);
                        if (withLikes) row.likes = await getLikes(row.id);
                        if (withComments) row.comments = await getComments(row.id);
                    }

                    resolve(rows);
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

	static async getFeed({ withMedia = false, withComments = false, withLikes = false, withLiked = false, authUserId }) {
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
                        if (withMedia) row.media = await getMedias(row.id);
                        if (withLikes) row.likes = await getLikes(row.id);
                        if (withComments) row.comments = await getComments(row.id);
						if (withLiked) {
							row.liked = await getLiked(row.id, authUserId);
						}

                    }

                    resolve(rows);
                } catch (error) {
                    reject(error);
                }
            });
		});
	}

    static async getById(id, { withMedia = false, withComments = false, withLikes = false, withLiked = false, authUserId = null }) {
        return new Promise((resolve, reject) => {
			const query = `SELECT post.*, user.id, user.displayname, user.profile_picture
				FROM posts AS post
				LEFT JOIN users AS user
				ON post.user_id = user.id WHERE post.id = ?
			`;

            db.execute(query, [id], async (err, rows) => {
                if (err)
                    reject(err);
                else
                    try {
                        if (rows.length === 0) return resolve(null);
                        let post = rows[0];
                        if (withMedia) post.media = await getMedias(post.id);
                        if (withComments) post.comments = await getComments(post.id);
                        if (withLikes) post.likes = await getLikes(post.id);
						if (withLiked && authUserId) post.liked = await getLiked(post.id, authUserId);

                        resolve(post);
                    } catch (error) {
                        reject(error);
                    }
            });
        });
    }

    static async create({ content, mediaUrls, user_id }) {
        return new Promise((resolve, reject) => {
            db.execute('INSERT INTO posts (user_id, description) VALUES (?, ?)', [user_id, content], async (err, rows) => {
                if (err)
                    reject(err);
                else {
                    if (rows.affectedRows === 0)
                        reject(new Error('post not created'));
                    else {
						if (mediaUrls && mediaUrls.length > 0) {
							const medias = await PostMedia.create({ mediaUrls, user_id, postId: rows.insertId });
							if (!medias) {
								await this.delete(rows.insertId);
								reject(new Error('post medias not created'));
							}
						}

						const post = await this.getById(rows.insertId, { withMedia: true, withComments: true, withLikes: true });
						console.log('post created', post);
						resolve(post);
					}
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