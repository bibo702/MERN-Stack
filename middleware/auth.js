const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  //Get the Token from the header
  // When we send a request to a protected route, we send throgh the header
  const token = req.header('x-auth-token');
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'no token,authorization denied' });
  }
  //Verify Token: If there is a token, it will decode it
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
