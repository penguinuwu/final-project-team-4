const PostModel = require('../models/posts');
const UserModel = require('../models/user');
const Game = require('../models/game');

const validTypes = ['image/png', 'image/jpeg', 'image/gif'];

const getPostData = async (req, post) => {
  // ignore posts with empty content
  if (!post[`${post.type}`]) return null;

  // ignore posts with non-existant authors
  const user = await UserModel.findById(post.author);
  if (!user) return null;

  // ignore posts with non-existant games
  const game = await Game.findById(post.game);
  if (!game) return null;

  // get basic data
  let data = {
    id: post.id,
    title: post.title,
    authorID: post.author,
    authorName: user.username,
    gameID: post.game,
    gameName: game.game,
    created: post.created.toString(),
    type: post.type,
    tags: post.tags,
    likes: post.likes,
    hasLiked: req.isAuthenticated() && post.likedBy.includes(req.user.id)
  };

  // get specific data
  switch (post.type) {
    case 'screenshot':
      // convert screenshot data to base64
      if (
        !post.screenshot.data ||
        !validTypes.includes(post.screenshot.contentType)
      )
        return null;
      let b64 = Buffer.from(post.screenshot.data).toString('base64');
      data.screenshot = `data:${post.screenshot.contentType};base64,${b64}`;
      break;

    case 'video':
    case 'text':
      // append post specific data and push to result
      data[`${post.type}`] = post[`${post.type}`];
      break;

    default:
      return null;
  }

  return data;
};

const getPost = async (req, res) => {
  try {
    const post = await PostModel.findById(`${req.query.postID}`);
    if (!post) return res.status(400).send('Invalid post id');

    let postData = await getPostData(req, post);
    if (!postData) return res.status(404).send('Invalid post');

    return res.status(200).send(postData);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const updateLikes = async (req, res) => {
  try {
    const post = await PostModel.findById(`${req.body.postID}`);
    if (!post) return res.status(404).send('Post not found');

    let hasLiked = false;
    // remove or add user in liked list
    if (post.likedBy.includes(req.user.id)) {
      post.likedBy = post.likedBy.filter((i) => i.toString() !== req.user.id);
    } else {
      post.likedBy.push(req.user.id);
      hasLiked = true;
    }
    // calculate and save likes info
    post.likes = post.likedBy.length;
    await post.save();
    return res.status(200).send({ hasLiked: hasLiked, likes: post.likes });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const getAllPosts = async (req, res) => {
  let result = {
    screenshots: [],
    videos: [],
    texts: []
  };

  try {
    for (const post of await PostModel.find()) {
      try {
        let postData = await getPostData(req, post);
        if (!postData) continue; // check if post is valid
        result[`${post.type}s`].push(postData);
      } catch (err) {
        // skip posts with errors
        continue;
      }
    }
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

const uploadData = async (req, res) => {
  // validate title
  if (!`${req.body.title}`) return res.status(400).send('Invalid title.');

  // validate game id
  let game = null;
  try {
    game = await Game.findById(`${req.body.gameID}`);
  } catch (error) {
    return res.status(400).send('Invalid Game ID.');
  }
  if (!game) return res.status(400).send('Invalid Game ID.');

  // create post json
  let post = {
    title: `${req.body.title}`,
    author: req.user.id,
    game: game.id,
    created: Date.now(),
    likes: 0,
    tags: `${req.body.tags}`.split(',').map((t) => t.trim())
  };

  // handle different post types
  switch (`${req.body.type}`) {
    case 'screenshot':
      if (!req.file) return res.status(400).send('No image uploaded.');
      if (!validTypes.includes(req.file.mimetype))
        return res.status(400).send('Invalid image.');
      post.type = 'screenshot';
      post.screenshot = {
        data: req.file.buffer,
        contentType: req.file.mimetype
      };
      break;

    case 'video':
      // validate youtube url
      const regexID = '([0-9A-Za-z_-]*)';
      const regex = `youtube.com\/watch\?.*v=${regexID}|youtube.com\/embed\/${regexID}|youtu.be\/${regexID}`;
      const result = `${req.body.video}`.match(regex);
      if (!result) return res.status(400).send('Invalid youtube URL');

      // extract the video id
      const videoID = result.slice(1).filter((e) => e)[0];
      if (!videoID) return res.status(400).send('Invalid youtube URL');

      // embed the video
      post.type = 'video';
      post.video = `https://youtube.com/embed/${videoID}`;
      break;

    case 'text':
      // validate text length
      if (`${req.body.text}`.length > 420)
        return res.status(400).send('Invalid text.');
      post.type = 'text';
      post.text = `${req.body.text}`;
      break;

    default:
      return res.status(400).send('Invalid upload.');
  }

  try {
    let newPost = await PostModel.create(post);
    game.media.push(newPost.id);
    await game.save();
    return res.status(200).send({ mediaID: newPost.id });
  } catch (error) {
    console.log(error);
    return res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  getPostData: getPostData,
  getPost: getPost,
  getAllPosts: getAllPosts,
  updateLikes: updateLikes,
  uploadData: uploadData
};
