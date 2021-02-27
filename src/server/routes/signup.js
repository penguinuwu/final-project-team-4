const bcrypt = require('bcryptjs');
const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');

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
        { game: ObjectId('123456789012'), rank: 'Gold', hours: 50 },
        { game: ObjectId('123456789014'), rank: 'Gold', hours: 52 },
        { game: ObjectId('123456789013'), rank: 'Gold', hours: 88 },
        { game: ObjectId('123456789016'), rank: 'Gold', hours: 17 },
        { game: ObjectId('123456789018'), rank: 'Gold', hours: 200 }
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

module.exports = signup;
