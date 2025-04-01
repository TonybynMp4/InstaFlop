const auth = require('../middlewares/auth');
const Comment = require('../models/comment');

const router = require('express').Router();

// public API
router.get('/getComment/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.getById(id);
        if (comment)
            res.status(200).json(comment);
        else
            res.status(404).json({ message: 'Comment not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getPostComments/:postId', async (req, res) => {
    const { postId } = req.params;
    try {
        const comments = await Comment.getByPostId(postId);
        res.status(200).json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.use(auth);
// protected API (only authenticated users can access)

router.post('/', async (req, res) => {
    const { postId, content } = req.body;

	if (!content && !postId) {
		res.status(400).json({ error: 'Content or postId is required' });
		return;
	}

    const { id: user_id } = req.auth;
	if (!user_id) {
		res.status(401).json({ error: 'Unauthorized' });
		return;
	}

    try {
        const post = await Comment.create({ content, postId, user_id });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;