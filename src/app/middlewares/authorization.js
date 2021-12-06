/**
 * Represents a middleware
 * @author Julio Cabrera
 * @param {*} req - HTTP Request
 * @param {*} res - HTTP Response
 * @param {*} next - callback
 * @returns res - HTTP Response
 */
const authorizeAdmin = (req, res, next) => {
  if (req.user.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};
/**
 * Represents a middleware
 * @author Julio Cabrera
 * @param {*} req - HTTP Request
 * @param {*} res - HTTP Response
 * @param {*} next - callback
 * @returns res - HTTP Response
 */
const authorizeUser = (req, res, next) => {
  if (req.user.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

module.exports = { authorizeAdmin, authorizeUser };
