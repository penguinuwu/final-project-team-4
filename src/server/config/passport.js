const bcrypt = require('bcryptjs');
const Strategy = require('passport-local').Strategy;
const Database = require('./database');

const auth = async (username, password, done) => {
  const message = { message: 'Incorrect credentials.' };

  // username does not exist
  if (!Database.hasOwnProperty(username)) return done(null, false, message);

  // check hashed password
  let user = Database[username];
  try {
    if (await bcrypt.compare(password, user.hash)) {
      return done(null, user);
    } else {
      return done(null, false, message);
    }
  } catch (e) {
    return done(e);
  }
};

const initialize = (passport) => {
  const fields = {
    usernameField: 'username',
    passwordField: 'password'
  };
  passport.use(new Strategy(fields, auth));
  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser((user, done) => {
    if (!Database.hasOwnProperty(user)) return done(null, false);
    return done(null, Database[user]);
  });
};

module.exports = initialize;
