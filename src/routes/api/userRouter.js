const express = require('express');
const User = require('../../models/user');
const app = express();

app.get('/getUsers', async (req, res) => {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/getUser/:id', async (req, res) => {
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

app.post('/', async (req, res) => {
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

app.delete('/', async (req, res) => {
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

app.put('/', async (req, res) => {
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

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        const user = await User.getByEmail(email);
        if (!user || user.password !== password) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = app;