import { Request, Response } from 'express';
import { Product } from '../models/admin';
import type { IProduct } from '../types/types';

export const getStore = (_: Request, res: Response) => {
  Product.fetchAll((products: IProduct) => {
    res.render('shop/index', { prods: products, titlePage: 'Home - Shop', path: '/' });
  });
};

export const getProductDetail = async (req: Request, res: Response) => {
  const { productId } = req.params;
  console.log({ productId });
  const prod = await Product.fetchProduct(productId);
  // console.log(prod);
  // TODO: Create the logic to retrieve the product info based on its ID. Apply frontend
  res.render('shop/detailProduct', {
    prod,
    path: `/shop/${productId}`,
    titlePage: 'Shop - Detail',
  });
};
