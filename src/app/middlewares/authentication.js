const { JWT_SECRET } = require('../../config/jwt');
const jwt = require('jsonwebtoken');

/**
 * Represents a middleware
 * @author Isaac Canché
 * @param {*} req - HTTP Request
 * @param {*} res - HTTP Response
 * @param {*} next - callback
 * @returns res - HTTP Response
 */
module.exports = (req, res, next) => {
  if (!req.headers['authorization']) {
    res.status(401).json({ message: 'You are not authenticated' });
  }

  const token = req.headers['authorization'].split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: 'Token can not be decoded', err });
    } else {
      req.user = decoded;
      next();
    }
  });
};
