const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {

  req.user = user;
  next();
}

function checkRole(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
}

module.exports = {
  authenticateUser,
  checkRole,
};
