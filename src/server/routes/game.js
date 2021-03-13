const Game = require('../models/game');
const Post = require('../models/posts');
const { getPostData } = require('./media')

const postGame = async (req, res) => {
  try {
    const game = `${req.body.game}`;
    const description = `${req.body.description}`;
    const tags = req.body.tags;
    const image = `${req.body.image}`; // url for now

    if (!game || !image)
      return res.status(401).send('Game title and image cannot be empty');

    const newGame = new Game({
      game,
      description,
      tags,
      image,
      reviews: [],
      media: [],
      video: false
    });
    await newGame.save();
    return res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    return res.status(200).send({ games });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const getGameDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const game = await Game.findById(id);
    const { averageRating, userRating } = calculateRatings(game.reviews, req);

    let media = [];
    for (const post of await Post.find({ _id: { $in: game.media } })) {
      let postData = await getPostData(req, post);
      if (postData) media.push(postData);
    }

    return res.status(200).send({
      game: game.game,
      image: game.image,
      description: game.description,
      averageRating,
      userRating,
      media
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const calculateRatings = (ratings, req) => {
  //return { averageRating: 1, userRating: 1 };
  if (!ratings) return 0;
  let total = 0;
  let sum = 0;
  let userRating = 0;
  for (const val of ratings.values()) {
    sum += val;
    total += 1;
  }
  if (req.user) {
    if (!ratings.get(`${req.user.id}`)) {
    } else {
      userRating = ratings.get(`${req.user.id}`);
    }
  }

  return {
    averageRating: sum / total,
    userRating
  };
};

const setRating = async (req, res) => {
  try {
    const id = req.body.id;
    const rating = req.body.rating;
    const game = await Game.findById(id);
    const uid = req.user.id;
    game.reviews.set(`${uid}`, rating);
    await game.save();
    return res.status(200).send('Success');
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  postGame,
  getAllGames,
  getGameDetails,
  setRating
};
