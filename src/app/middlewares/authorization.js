const authorizeAdmin = (req, res, next) => {
  if (req.user.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}

const authorizeUser = (req, res, next) => {
  if (req.user.user.role !== 'user') {
    return res.status(403).json({ message: 'Access denied' })
  }
  next()
}

module.exports = { authorizeAdmin, authorizeUser }
