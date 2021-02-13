const router = require('express').Router();
const API_URL = process.env.API_URL;

// testing routes
if (process.env.DEV) {
  // hide favicon.ico error
  router.get('/favicon.ico', (_req, res) => res.status(200));

  // get root testing page
  router.get('/', require('../testing/index'));

  // post test
  router.post(`${API_URL}/test`, (req, res) =>
    res.status(200).send(`Success, ${JSON.stringify(req.body)}`)
  );
}

const signup = require('./signup');
const signin = require('./signin');
const signout = require('./signout');
router.post(`${API_URL}/signup`, signup);
router.post(`${API_URL}/signin`, signin);
router.post(`${API_URL}/signout`, signout);

module.exports = router;
