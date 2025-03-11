import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { email, password } from '../../middlewares/validators.js';
import validationResult from '../../middlewares/validationResult.js';
import auth from '../../middlewares/auth.js';
import { Router } from 'express';

const router = Router();
// public API
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
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

        const token = jwt.sign({
            id: user.id,
            role: user?.role || 'user',
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/register', email, password, validationResult, async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ errors: {msg: 'All fields are required'} });
        return;
    }

    try {
        const user = await User.getByEmail(email);
        if (user) {
            res.status(400).json({ errors: {msg:  'Email already exists'} });
            return;
        }

        const newUser = await User.create(username, email, password);
        res.status(201).json({ok: true, newUser});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

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

router.use(auth);
// protected API (only authenticated users can access)
router.get('/', async (req, res) => {
    const authUserId = req.auth.id;

    if (!authUserId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    try {
        const user = await User.getById(authUserId);
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({ message: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.delete('/', async (req, res) => {
    const userId = req.body.id;
    const { id: authUserId, role: authUserRole } = req.auth;

    if (!userId) {
        res.status(400).json({ error: 'User ID is required' });
        return;
    }

    if (!authUserId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }

    if (authUserId !== userId && authUserRole !== 'admin') {
        res.status(403).json({ error: 'Forbidden' });
        return;
    }

    try {
        const user = await User.delete(userId);
        if (user)
            res.status(200).json({ message: 'User deleted', user });
        else
            res.status(404).json({ message: 'User not found' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/', async (req, res) => {
    const authUserId = req.auth.id;
    const { id, username, email } = req.body;

    if (!id)
        res.status(400).json({ error: 'User ID is required' });
    else if (!username && !email) {
        res.status(400).json({ error: 'At least one field is required' });
    }

    if (!authUserId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
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

export default router;