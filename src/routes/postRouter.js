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
            res.status(404).json({ error: 'Post not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getPosts/:username', async (req, res) => {
    const { username } = req.params;
	const user_id = req?.auth?.id;

    try {
        const posts = await Post.getPostsByUsername(username, { withLiked: !!user_id, authUserId: user_id });
        if (posts)
            res.status(200).json({posts});
        else
            res.status(404).json({ error: 'Post not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.use(auth);
// protected API (only authenticated users can access)

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

    const user = await User.getById(user_id);
	if (!user) {
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

	if (!authUser) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	const user = await User.getById(authUser.id);
	if (!user) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

	try {
        const posts = await Post.getFeed({ authUserId: authUser.id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;