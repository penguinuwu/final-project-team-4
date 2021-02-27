const UserModel = require('../models/user');

const updateUsername = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    user.username = req.body.username;
    const result = await user.save();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const updateDescription = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    user.description = req.body.description;
    const result = await user.save();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

// Sends basic user details: username, description, commends
const getUserDetails = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    return res.status(200).send({
      username: user.username,
      description: user.description,
      commendations: {
        skillful: user.commendation.skillful,
        friendly: user.commendation.friendly,
        knowledgeable: user.commendation.knowledgeable
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const updateCommends = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    user.commendation.skillful = req.body.skillful;
    user.commendation.friendly = req.body.friendly;
    user.commendation.knowledgeable = req.body.knowledgeable;
    const result = await user.save();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const updateImage = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    // Get the image and update the db

    const result = await user.save();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const getGames = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    const games = user.games;
    return res.status(200).send({ games: games });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const updateRank = async (req, res) => {
  // Request: user, game, new rank
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) return res.status(404).send('User not found');

    // Can't use findbyid since id is a seperate field from the game id in the db
    const game = user.games.find((x) => x.game == req.body.gameID);
    if (!game) return res.status(404).send('Game not found');

    game.rank = req.body.rank;
    const result = await user.save();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  updateUsername,
  updateDescription,
  updateCommends,
  getUserDetails,
  updateImage,
  updateRank,
  getGames
};
