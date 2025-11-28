import { ArticleModel } from "../models/article.model.js";

export const ownerMiddleware = async (req, res, next) => {
  try {
    const user = req.userLogged;
    const article = await ArticleModel.findByPk(req.params.id);
    const articleUserID = article.dataValues.user_id;
    console.log(articleUserID);
    console.log(user.id);
    console.log(user.role);
    if (user.role === "admin" || user.id === articleUserID) {
      return next();
    }
    return res.status(401).json("Usted no puede hacer eso");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};