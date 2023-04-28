const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = authenticateJWT;