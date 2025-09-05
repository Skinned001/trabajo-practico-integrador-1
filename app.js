import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/database.js';

import cookieParser from 'cookie-parser';
import { UserModel } from './src/models/user.model.js';
import { TagModel } from './src/models/tag.model.js';
import { ProfileModel } from './src/models/profile.model.js';
import { ArticleModel } from './src/models/article.model.js';
import { ArticleTagModel } from './src/models/articleTag.model.js';



const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});


connectDB().then(() => {
  app.listen(PORT, () =>
    console.log('>>> Servidor escuchando en http://localhost:' + PORT)
  );
});