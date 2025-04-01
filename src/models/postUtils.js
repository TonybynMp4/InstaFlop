const db = require('./db')

async function getMedias(postId) {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT * FROM post_medias WHERE post_id = ?`, [postId], (err, data) => {
            if (err) reject(err);
			else resolve(data);
        });
    });
}

async function getLikes(postId) {
	return new Promise((resolve, reject) => {
		db.execute('SELECT COUNT(*) AS likes FROM likes WHERE post_id = ?', [postId], (err, data) => {
			if (err) reject(err);
			else resolve(data[0].likes || 0);
		});
	});
}

async function getLiked(postId, authUserId) {
	return new Promise((resolve, reject) => {
		db.execute('SELECT * FROM likes WHERE post_id = ? AND user_id = ?', [postId, authUserId], (err, rows) => {
			if (err) reject(err);
			else resolve(rows.length > 0);
		});
	});
}

module.exports = {
	getMedias,
	getLikes,
	getLiked
};