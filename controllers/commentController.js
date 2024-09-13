const Post = require('../models/Post');
const Comment = require('../models/Comment');

exports.addComment = async (req, res) => {
  const { comment } = req.body;
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    const newComment = new Comment({
      post: req.params.postId,
      user: req.user.id,
      comment,
    });

    await newComment.save();
    post.comments.push(newComment.id);
    await post.save();

    res.json({ success: true, commentId: newComment.id, message: 'Comment added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Comment.findByIdAndRemove(req.params.commentId);
    const post = await Post.findById(req.params.postId);
    post.comments = post.comments.filter(id => id.toString() !== req.params.commentId);
    await post.save();

    res.json({ success: true, message: 'Comment deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
