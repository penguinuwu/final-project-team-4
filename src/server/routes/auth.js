const passport = require('passport');
const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');

const check = (req, res, next) => {
  // check if user has been authenticated
  if (!req.isAuthenticated()) return res.status(403).send('Not signed in.');
  return next();
};

const session = (req, res) => {
  // return session information if available
  if (req.user && req.user.username)
    return res.status(200).send(req.user.username);
  return res.status(403).send('Not signed in.');
};

const signup = async (req, res) => {
  // filter out re-authenticate
  if (req.isAuthenticated()) return res.status(401).send('Already logged in');

  // template strings to force input into string
  const username = `${req.body.username}`;
  const password = `${req.body.password}`;

  // filter out empty username or password
  if (!username || !password)
    return res.status(401).send('Username and password cannot be empty');

  try {
    // filter out duplicate usernames
    if (await User.findOne({ username: username }))
      return res.status(401).send('Username has already been taken');

    // generate salt and hash
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    // create new user
    let newUser = new User({
      username: username,
      hash: hash,
      description: 'Hello World!',
      commendations: {
        skillful: 0,
        friendly: 0,
        knowledgeable: 0
      },
      games: [
        // TODO: set this to empty
        { game: ObjectId('604ac3a539782490357d7f99'), rank: 'Gold', hours: 1 },
        { game: ObjectId('604ac61339782490357d7f9b'), rank: 'Pog', hours: 69 }
      ],
      media: [],
      friends: [],
      blacklist: []
    });
    // store new user
    await newUser.save();
    return res.status(200).send('Success');
  } catch (err) {
    console.log(err);
    return res.status(500).send('Internal Server Error');
  }
};

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

const signout = (req, res) => {
  // already signed out
  if (!req.isAuthenticated()) return res.status(200).send('Success');

  // log out
  req.logOut();
  return res.status(200).send('Success');
};

module.exports = {
  check: check,
  session: session,
  signup: signup,
  signin: signin,
  signout: signout
};
