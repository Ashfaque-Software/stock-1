const express = require('express');
const {
  createPost,
  getAllPosts,
  getSinglePost,
  deletePost
} = require('../controllers/postController'); // Ensure these imports are correct
const { addComment, deleteComment } = require('../controllers/commentController');
const { likePost, unlikePost } = require('../controllers/likeController');
const auth = require('../utils/authMiddleware');

const router = express.Router();

router.post('/', auth, createPost); // Check if createPost is correctly imported
router.get('/', getAllPosts); // Check if getAllPosts is correctly imported
router.get('/:postId', getSinglePost); // Check if getSinglePost is correctly imported
router.delete('/:postId', auth, deletePost); // Check if deletePost is correctly imported

router.post('/:postId/comments', auth, addComment); // Check if addComment is correctly imported
router.delete('/:postId/comments/:commentId', auth, deleteComment); // Check if deleteComment is correctly imported

router.post('/:postId/like', auth, likePost); // Check if likePost is correctly imported
router.delete('/:postId/like', auth, unlikePost); // Check if unlikePost is correctly imported

module.exports = router;
