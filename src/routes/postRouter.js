const auth = require('../middlewares/auth');
const Post = require('../models/post');

const router = require('express').Router();

// public API
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


router.use(auth);
// protected API (only authenticated users can access)

router.post('/', async (req, res) => {
    const { user_id } = req.body;

    if (!user_id) {
        res.status(400).json({ error: 'Title and user id are required!' });
        return;
    }

    try {
        const post = await Post.create(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getFeed', async (req, res) => {
	const authUser = req.auth;

	try {
        const posts = await Post.getFeed({ withMedia: true, withComments: true, withLikes: true, authUserId: authUser.id });
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;