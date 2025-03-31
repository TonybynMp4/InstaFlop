const auth = require('../middlewares/auth');
const Post = require('../models/post');

const router = require('express').Router();

// public API
router.get('/getPost/:id', async (req, res) => {
    const { id } = req.params;
    const user_id = req.auth.id;
    try {
        const post = await Post.getById(id, { withMedia: true, withComments: true, withLikes: true, withLiked: !!user_id, authUserId: user_id });
        if (post)
            res.status(200).json(post);
        else
            res.status(404).json({ message: 'Post not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.use(auth);
// protected API (only authenticated users can access)

router.get('/getPosts', async (req, res) => {
    const { id: user_id } = req.auth;
    try {
        const posts = await Post.getAll({ withMedia: true, withComments: true, withLikes: true, withLiked: true, authUserId: user_id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    const { content, mediaUrls } = req.body;

	if (!content && !mediaUrls) {
		res.status(400).json({ error: 'Content or mediaUrls is required' });
		return;
	}

    const { id: user_id } = req.auth;
	if (!user_id) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

    try {
        const post = await Post.create({ content, mediaUrls, user_id });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getFeed', async (req, res) => {
	const authUser = req.auth;

	try {
        const posts = await Post.getFeed({ withMedia: true, withComments: true, withLikes: true, withLiked: true, authUserId: authUser.id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;