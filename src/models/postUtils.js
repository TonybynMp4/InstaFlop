const db = require('./db')

async function getMedias(postId) {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT * FROM post_medias WHERE post_id = ?`, [postId], (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function getLikes(postId) {
	return new Promise((resolve, reject) => {
		const query = `
			SELECT COUNT(*) AS likes FROM likes WHERE post_id = ?
		`;

		db.execute(query, [postId], (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data[0].likes);
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

async function getLiked(postId, authUserId) {
	return new Promise((resolve, reject) => {
		db.execute('SELECT * FROM likes WHERE post_id = ? AND user_id = ?', [postId, authUserId], (err, rows) => {
			if (err) {
				reject(err);
			} else {
				resolve(rows.length > 0);
			}
		});
	});
}

module.exports = {
	getMedias,
	getLikes,
	getComments,
	getLiked
};