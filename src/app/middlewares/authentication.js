const { JWT_SECRET } = require('../../config/jwt');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (!req.headers['authorization']) {
    res.status(401).json({ message: 'You are not authenticated' });
  }

  const token = req.headers['authorization'].split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(500).json({ message: 'Token can not be decoded', err });
    } else {
      req.user = decoded;
      next();
    }
  });
};
