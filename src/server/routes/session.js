const session = (req, res) => {
  // return session information if available
  if (req.user && req.user.username)
    return res.status(200).send(req.user.username);
  return res.status(403).send('Not signed in.');
};

module.exports = session;
