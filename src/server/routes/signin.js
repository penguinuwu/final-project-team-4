const passport = require('passport');

const signin = (req, res, next) => {
  // filter out re-authenticate
  if (req.isAuthenticated()) return res.status(200).send(req.user.username);

  return passport.authenticate('local', (err, user) => {
    // handle error
    if (err) return next(err);

    // filter out empty user
    if (!user) return res.status(401).send('Incorrect credentials.');

    // use passport to login
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).send(user.username);
    });
  })(req, res, next);
};

module.exports = signin;
