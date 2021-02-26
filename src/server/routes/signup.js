const bcrypt = require('bcryptjs');
const Database = require('../config/database');

const signup = async (req, res) => {
  // filter out re-authenticate
  if (req.isAuthenticated()) return res.status(401).send('Already logged in');

  // template strings to force input into string
  const username = `${req.body.username}`;
  const password = `${req.body.password}`;

  // filter out empty username or password
  if (!username || !password)
    return res.status(401).send('Username and password cannot be empty');

  // filter out duplicate usernames
  if (Database.hasOwnProperty(username))
    return res.status(401).send('Username has already been taken');

  // register user
  try {
    // generate salt and hash
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    // create user
    let user = {
      username: username,
      hash: hash
    };

    // store user
    Database[username] = user;
    return res.status(200).send('Success');
  } catch (err) {
    console.log(err);
    return res.status(401).send('Cannot register user');
  }
};

module.exports = signup;
