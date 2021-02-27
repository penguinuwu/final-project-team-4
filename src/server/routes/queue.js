const { ObjectId } = require('mongoose').Types;
const User = require('../models/user');
const Queue = require('../models/queue');

const getQueue = async (req, res) => {
  // force game name to be a string
  let query = {};
  if (req.body.gameID) query.game = `${req.body.gameID}`;

  // convert string to ObjectId for future reference
  // let gameID = req.body.gameID ? ObjectId(`${req.body.gameID}`) : null;

  try {
    // find all queues
    let allQueues = await Queue.find(query);

    // create array of queue objects
    let parsedQueues = [];
    let userInQueue = false;

    for (const row of allQueues) {
      // check if user is in queue
      if (!userInQueue && req.user.id == row.user) userInQueue = true;

      // query for user for username
      let user = await User.findById(`${row.user}`);

      const reqUserGame = req.user.games.find((x) => x.game.equals(row.game));
      const userGame = user.games.find((x) => x.game.equals(row.game));
      if (userGame.rank !== reqUserGame.rank) continue;

      // append to array
      parsedQueues.push({
        id: row.id,
        game: row.game,
        rank: userGame.rank,
        user: user ? user.username : null
      });
    }

    return res
      .status(200)
      .send({ inQueue: userInQueue, queues: parsedQueues });
  } catch (e) {
    return res.status(500).send('Internal Server Error');
  }
};

const joinQueue = async (req, res) => {
  // validate user id
  if (!req.user.id) return res.status(403).send('Please signin.');
  if (!req.body.gameID) return res.status(400).send('Please pick a game.');

  let gameID = ObjectId(`${req.body.gameID}`);

  // TODO: change this to query games database
  if (
    !ObjectId('123456789012').equals(gameID) &&
    !ObjectId('123456789014').equals(gameID) &&
    !ObjectId('123456789013').equals(gameID) &&
    !ObjectId('123456789016').equals(gameID) &&
    !ObjectId('123456789018').equals(gameID)
  )
    return res.status(400).send('Please pick a valid game.');

  try {
    await Queue.create({
      game: gameID,
      user: req.user.id
    });
    return res.status(200).send('You have joined the queue.');
  } catch (e) {
    return res.status(500).send('Internal Server Error');
  }
};

const leaveQueue = async (req, res) => {
  // validate user id
  if (!req.user.id) return res.status(403).send('Please signin.');
  try {
    let result = await Queue.deleteOne({ user: req.user.id });
    // check if any users have been deleted
    if (result.deletedCount === 0)
      return res.status(403).send('You have not joined the queue.');
    return res.status(200).send('You have left the queue.');
  } catch (e) {
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getQueue: getQueue,
  joinQueue: joinQueue,
  leaveQueue: leaveQueue
};
