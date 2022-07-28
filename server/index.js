import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';

import AuthRoute from './routes/auth.js';
import PostRoute from './routes/posts.js';
import CommentRoute from './routes/comment.js';

const app = express();
dotenv.config();

//Middleware
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.static('uploads'));

app.use('/api/auth/', AuthRoute);
app.use('/api/posts/', PostRoute);
app.use('/api/comments/', CommentRoute);

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:admin@cluster0.ssyawtq.mongodb.net/mern?retryWrites=true&w=majority`
    );

    app.listen(3002, () =>
      console.log(`Server started on port ${process.env.PORT}`)
    );
  } catch (e) {
    console.log(e.message);
  }
}

start();
