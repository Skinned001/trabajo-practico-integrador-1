import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/database.js';

import cookieParser from 'cookie-parser';
import { UserModel } from './src/models/user.model.js';
import { TagModel } from './src/models/tag.model.js';
import { ProfileModel } from './src/models/profile.model.js';
import { ArticleModel } from './src/models/article.model.js';
import { ArticleTagModel } from './src/models/articleTag.model.js';
import { tagRoutes } from './src/routes/tag.routes.js';
import { userRoutes } from './src/routes/user.routes.js';
import { articleRoutes } from ':/scr/routes/article.routes.js';


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());  // NECESARIO: para leer req.cookies

app.use("/api", userRoutes);
app.use("/api", tagRoutes);
app.use("/api", articleRoutes);


app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

connectDB().then(() => {
  app.listen(PORT, () =>
    console.log('>>> Servidor escuchando en http://localhost:' + PORT)
  );
});