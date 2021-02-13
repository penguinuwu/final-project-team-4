const signout = (req, res) => {
  // already signed out
  if (!req.isAuthenticated()) return res.status(200).send('Success');

  // log out
  req.logOut();
  return res.status(200).send('Success');
};

module.exports = signout;
