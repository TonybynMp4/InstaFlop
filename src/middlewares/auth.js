module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: 'Authorization header is required' });
    }
    const token = authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token is required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
    }

    req.auth = decoded;
    next();
}