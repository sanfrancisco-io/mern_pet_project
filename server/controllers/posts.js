import Post from '../models/Post.js';
import User from '../models/User.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

//Create Post

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const user = await User.findById(req.userId);

    if (req.files) {
      let fileName = Date.now().toString() + req.files.image.name;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      req.files.image.mv(path.join(__dirname, '../', 'uploads', fileName));

      const newPostWithImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: fileName,
        author: req.userId,
      });

      await newPostWithImage.save();
      await User.findByIdAndUpdate(req.userId, {
        $push: { posts: newPostWithImage },
      });

      return res.json(newPostWithImage);
    }

    const newPostWIthOutImage = new Post({
      username: user.username,
      title,
      text,
      imgUrl: '',
      author: req.userId,
    });

    await newPostWIthOutImage.save();
    await User.findByIdAndUpdate(req.userId, {
      $push: { posts: newPostWIthOutImage },
    });
    res.json(newPostWIthOutImage);
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort('-createdAt');
    const popularPosts = await Post.find().limit(5).sort('-views');

    if (!posts) {
      return res.json({ message: 'Постов нет ' });
    }

    res.json({ posts, popularPosts });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    res.json(post);
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const list = await Promise.all(
      user.posts.map((post) => Post.findById(post._id))
    );

    res.json(list);
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      res.json({ message: 'Такого поста не существует' });
    }
    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id },
    });
    res.json({ message: 'Пост был удален' });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};
