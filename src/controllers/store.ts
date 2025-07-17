import { NextFunction, Request, Response } from 'express';
import { Product } from '../models/Product';
import Cart from '../models/Cart';

import type { IProduct } from '../types/types';

const getStore = (_: Request, res: Response) => {
  Product.fetchAll((products: IProduct) => {
    res.render('shop/index', { prods: products, titlePage: 'Home - Shop', path: '/' });
  });
};

const getProductDetail = async (req: Request, res: Response) => {
  const { productId } = req.params;
  const prod = await Product.findProductID(productId);

  res.render('shop/detailProduct', {
    prod,
    path: `/shop/${productId}`,
    titlePage: 'Shop - Detail',
  });
};

const getCart = async (_req: Request, res: Response, _next: NextFunction) => {
  const productsCart = await Cart.fetchCart();

  res.render('shop/cart', {
    path: '/cart',
    titlePage: 'Shop',
    cart: productsCart,
  });
};

const postCart = async (req: Request, res: Response) => {
  const { productId } = req.body;

  // Deleting Cart
  if (req.query.delete) {
    await Cart.deleteFromCart(productId);
    res.redirect('/cart');
    return;
  }

  const p = await Product.findProductID(productId);
  console.log({ productId, query: req.query });
  await Cart.addToCart(p!);
  res.redirect('/cart');
};

const StoreController = {
  getStore,
  getProductDetail,
  getCart,
  postCart,
};

export default StoreController;
