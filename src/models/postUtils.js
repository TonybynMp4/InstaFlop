const db = require('./db')

async function getMedias(postId) {
    return new Promise((resolve, reject) => {
        db.execute(`SELECT * FROM post_medias WHERE post_id = ?`, [postId], (err, data) => {
            if (err) reject(err);
			else resolve(data);
        });
    });
}

module.exports = {
	getMedias
};