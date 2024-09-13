const Post = require('../models/Post');
const paginate = require("../utils/pagination");

exports.createPost = async (req, res) => {
  const { stockSymbol, title, description, tags } = req.body;
  try {
    const newPost = new Post({
      stockSymbol,
      title,
      description,
      tags,
      user: req.user.id
    });
    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllPosts = async (req, res) => {
  const { page, limit } = req.query;
  try {
    const postsQuery = Post.find().populate('user', 'username');
    const posts = await paginate(postsQuery, parseInt(page, 10), parseInt(limit, 10));
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .populate('user', 'username')
      .populate({
        path: 'comments',
        populate: { path: 'user', select: 'username' }
      });
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Post.findByIdAndRemove(req.params.postId);
    res.json({ success: true, message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
