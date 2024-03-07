import { Product } from "../models/admin.js";

export const getStore = (req, res, next) => {
  const products = Product.fetchAll();
  res.render("home", { prods: products, titlePage: "Home - Shop", path: "/" });
};
