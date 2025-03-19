const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies) {
        return res.status(401).json({ error: 'Cookies are required' });
    }


    const token = cookies.token;
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