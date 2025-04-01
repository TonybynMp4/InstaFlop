const db = require('./db');

class Like {
	static async create(userId, postId) {
		return new Promise((resolve, reject) => {
			const query = `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`;
			db.query(query, [userId, postId], (err, result) => {
				if (err) return reject(err);
				else resolve(result);
			});
		});
	}

	static async delete(userId, postId) {
		return new Promise((resolve, reject) => {
			const query = `DELETE FROM likes WHERE user_id = ? AND post_id = ?`;
			db.query(query, [userId, postId], (err, result) => {
				if (err) return reject(err);
				else resolve(result);
			});
		});
	}

	static async getByPostId(postId) {
		return new Promise((resolve, reject) => {
			const query = `SELECT user_id FROM likes WHERE post_id = ?`;
			db.query(query, [postId], (err, rows) => {
				if (err) return reject(err);
				else resolve(rows);
			});
		});
	}

	static async getByUserId(userId) {
		return new Promise((resolve, reject) => {
			const query = `SELECT post_id FROM likes WHERE user_id = ?`;
			db.query(query, [userId], (err, rows) => {
				if (err) return reject(err);
				else resolve(rows);
			});
		});
	}

	static async getIsLiked(userId, postId) {
		return new Promise((resolve, reject) => {
			const query = `SELECT post_id FROM likes WHERE user_id = ? AND post_id = ?`;
			db.query(query, [userId, postId], (err, rows) => {
				if (err) return reject(err);
				else resolve(rows);
			});
		});
	}
}

module.exports = Like;