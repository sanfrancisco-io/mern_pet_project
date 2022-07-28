import Comment from '../models/Comment.js';

import Post from '../models/Post.js';

export const createComment = async (req, res) => {
  try {
    const { postId, comment } = req.body;
    if (!comment) {
      res.json({ message: 'Комментарии не может быть пустым' });
    }
    const newComment = new Comment({ comment });
    await newComment.save();

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id },
      });
    } catch (err) {
      res.json({ message: err.message });
    }

    res.json(newComment);
  } catch (e) {
    res.json({ message: e.message });
  }
};
