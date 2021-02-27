const check = (req, res, next) => {
  // check if user has been authenticated
  if (!req.isAuthenticated()) return res.status(403).send('Not signed in.');
  return next();
};

module.exports = check;
