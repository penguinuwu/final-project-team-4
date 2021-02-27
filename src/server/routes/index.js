const router = require('express').Router();
const API_URL = process.env.API_URL;

// testing routes
if (process.env.DEBUG) {
  // hide favicon.ico error
  router.get('/favicon.ico', (_req, res) => res.status(200));

  // get root testing page
  router.get('/', require('../testing/index'));

  // post test
  router.post(`${API_URL}/test`, (req, res) =>
    res.status(200).send(`Success, ${JSON.stringify(req.body)}`)
  );
}

// authentication-related routes
const check = require('./check');
const session = require('./session');
const signup = require('./signup');
const signin = require('./signin');
const signout = require('./signout');
router.post(`${API_URL}/session`, [check, session]);
router.post(`${API_URL}/signup`, signup);
router.post(`${API_URL}/signin`, signin);
router.post(`${API_URL}/signout`, signout);

// queue-related routes
const { getQueue, joinQueue, leaveQueue } = require('./queue');
router.post(`${API_URL}/getqueue`, [check, getQueue]);
router.post(`${API_URL}/joinqueue`, [check, joinQueue]);
router.post(`${API_URL}/leavequeue`, [check, leaveQueue]);

// User related routes
const {
  updateDescription,
  updateUsername,
  updateCommends,
  getUserDetails,
  updateImage,
  updateRank,
  getGames
} = require('./user');
router.post(`${API_URL}/updateDescription`, [check, updateDescription]);
router.post(`${API_URL}/updateUsername`, [check, updateUsername]);
router.post(`${API_URL}/updateCommends`, [check, updateCommends]);
router.get(`${API_URL}/getUserDetails`, [check, getUserDetails]);
router.post(`${API_URL}/updateImage`, [check, updateImage]);
router.post(`${API_URL}/updaterank`, [check, updateRank]);
router.get(`${API_URL}/getgames`, [check, getGames]);

module.exports = router;
