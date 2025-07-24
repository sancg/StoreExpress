import { Request, Response } from 'express';
import { Product } from '../models/Product';
import type { IProduct } from '../types/types';

const getProductForm = (_req: Request, res: Response) => {
  res.render('admin/add-product', {
    edit: false,
    product: null,
    titlePage: 'Admin - Add',
    path: '/admin',
  });
};

const sendToEditProduct = async (req: Request, res: Response) => {
  const { productId } = req.body;
  const p = await Product.findProductID(productId);
  res.render('admin/add-product', {
    edit: true,
    product: p,
    titlePage: 'Admin - Edit',
    path: '/admin?edit=true',
  });
};

const getProducts = (_req: Request, res: Response) => {
  Product.fetchAll((products: IProduct) => {
    res.render('admin/view-products', {
      prods: products,
      titlePage: 'Admin - Products',
      path: '/admin/view-products',
    });
  });
};

const addProduct = (req: Request, res: Response) => {
  const { title, price, description, imageUrl } = req.body;

  new Product({ title, price: Number(price), imageUrl, description }).save();

  // console.log({ data: req.body, params: req.params });
  res.redirect('/');
};

const editProduct = (req: Request, res: Response) => {
  const { price } = req.body;
  //TBD: Validation of data.
  const p = { ...req.body, price: Number(price) };
  Product.editProduct(p);
  res.redirect('/admin');
};

const AdminController = {
  getProductForm,
  postProduct: addProduct,
  getProducts,
  editProduct,
  sendToEditProduct,
};
export default AdminController;
