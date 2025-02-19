const Post = require('../../models/post');

const router = require('express').Router();

router.get('/getPosts', async (req, res) => {
    try {
        const posts = await Post.getAll({ withMedia: true, withComments: true, withLikes: true });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getPost/:id', async (req, res) => {
    const { id, queryParam } = req.params;
    try {
        const post = await Post.getById(id, queryParam);
        if (post)
            res.status(200).json(post);
        else
            res.status(404).json({ message: 'Post not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;