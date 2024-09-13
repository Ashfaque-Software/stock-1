const Post = require('../models/Post');

exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Post already liked' });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.json({ success: true, message: 'Post liked' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    if (!post.likes.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Post not liked yet' });
    }

    post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    await post.save();

    res.json({ success: true, message: 'Post unliked' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
