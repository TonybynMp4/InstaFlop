const router = require('express').Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { email, password } = require('../../middlewares/validators');
const validationResult = require('../../middlewares/validationResult');

// public API
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/getUser/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.getById(id);
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({ message: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//TODO: API auth middleware
//router.use();
// protected API (only authenticated users can access)

router.post('/', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/', async (req, res) => {
    const { id } = req.body;

    if (!id) {
        res.status(400).json({ error: 'User ID is required' });
        return;
    }

    try {
        const user = await User.delete(id);
        if (user)
            res.status(200).json({ message: 'User deleted', user });
        else
            res.status(404).json({ message: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/', async (req, res) => {
    const { id, username, email } = req.body;

    if (!id)
        res.status(400).json({ error: 'User ID is required' });
    else if (!username &&!email) {
        res.status(400).json({ error: 'return at least one field to update' });
    }

    try {
        const user = await User.update(id, req.body);
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({ message: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const user = await User.getByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            role: user.role,
            expiresIn: '1h'
        });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', email, password, validationResult, async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const user = await User.getByEmail(email);
        if (user) {
            res.status(400).json({ error: 'Email already registered' });
            return;
        }

        const newUser = await User.create(req.body);
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;