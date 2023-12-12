const express = require('express');
const app = express();
const { userRouter } = require('./routes/userRouter');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ debug: true, override: true });

const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.px94k2q.mongodb.net/nodejsBlog?retryWrites=true&w=majority`;

const server = async () => {
  try {
    // 주석된 option 전부 deprecation
    // mongoose.set('useFindAndModify', false)
    // await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    await mongoose.connect(MONGO_URI);
    mongoose.set('debug', true); // 디버그 모드
    console.log('MongoDB connected');
    app.use(express.json());

    app.use('/user', userRouter);

    app.listen(PORT, () => {
      console.log(`listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

server();
