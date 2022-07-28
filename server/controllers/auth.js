import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    const isUser = await User.findOne({ username });

    if (isUser) {
      return res.json({
        message: `Данный user: ${username} уже занят`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    await newUser.save();

    res.json({
      newUser,
      token,
      message: 'Регистрация прошла успешно.',
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!user) {
      return res.json({ message: 'Такого пользователя не сущесвтует' });
    }
    if (!isPasswordCorrect) {
      res.json({ message: 'Неверный пароль' });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.json({
      token,
      user,
      message: 'Вы вошли в систему',
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};

//aboutUser
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      res.json({
        message: 'Такого пользователя не сущесвтует',
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.json({
      user,
      token,
    });
  } catch (e) {
    res.json({
      message: e.message,
    });
  }
};
