const auth = require('../middlewares/auth');
const Post = require('../models/post');
const User = require('../models/user');

const router = require('express').Router();

// public API
router.get('/getPost/:id', async (req, res) => {
    const { id } = req.params;
    const user_id = req?.auth?.id;

    try {
        const post = await Post.getById(id, { withLiked: !!user_id, authUserId: user_id });
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
	const { id: user_id } = req.query
    const { id: authUserId } = req.auth;
    try {
		const posts = [];

		if (user_id && user_id !== authUserId) {
			const user = await User.getById(user_id);
			if (!user) {
				res.status(404).json({ error: 'User not found' });
				return;
			}
		}

		if (!user_id) {
			posts.push(await Post.getAll({ authUserId: authUserId}));
		} else {
			posts.push(await Post.getPostsByUserId(user_id, { withLiked: !!authUserId, authUserId: authUserId }));
		}
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
        const posts = await Post.getFeed({ authUserId: authUser.id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;