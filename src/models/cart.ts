import { readFile, writeFile } from 'node:fs/promises';
import type { IProduct, modelCart, IProductCart } from '../types/types';
import rootPath from '../utils/paths';
import Connection from './connection';

export default class Cart {
  private static pathConnection: string = rootPath + '/db/cart.json';

  static async fetchCart(cb?: Function) {
    if (!cb) {
      return new Promise((resolve, reject) => {
        Connection.getFile((info) => {
          if (!info.error) {
            resolve(info.data);
          }
          reject(info);
        }, this.pathConnection);
      });
    }

    return Connection.getFile((info) => {
      if (!info.error) {
        cb(info.data);
      }
    }, this.pathConnection);
  }

  static async addToCart(p: IProduct) {
    // Fetch the previous cart
    let cart: modelCart = { products: [], totalPrice: 0 };

    try {
      const cartData: modelCart = JSON.parse(
        await readFile(this.pathConnection, { encoding: 'utf8' })
      );
      if (cartData?.products) {
        cart = cartData;
      }
    } catch (error) {
      console.warn('Cart object was not found: ' + error);
    }
    // Analyze the cart -> Find existing product
    const isProduct = cart.products.findIndex((product) => product.id === p.id);
    const existingProduct = cart.products[isProduct];

    // IMPROVE: Why should you create a shadow copy of the cart.products if it is already there? How to improve the update method
    let updateProduct = null;
    if (existingProduct) {
      updateProduct = { ...existingProduct };
      updateProduct.quantity += 1;

      cart.products[isProduct] = updateProduct;
    } else {
      updateProduct = { ...p, quantity: 1 };
      cart.products = [...cart.products, updateProduct];
    }

    // Add new product / increase quantity
    cart.totalPrice += updateProduct.price;
    // console.log({ cart });
    await writeFile(this.pathConnection, JSON.stringify(cart, null, 2), { encoding: 'utf8' });
  }

  static async deleteFromCart(productId: string) {
    // 1. Get all the cart
    const cart = (await this.fetchCart()) as { products: IProductCart[]; totalPrice: number };
    // console.log({ totalBefore: cart.totalPrice });
    // 2. Extract the product to delete from
    const p = cart.products.find((prod) => prod.id === productId);
    if (!p) {
      console.warn(`Product ID: ${productId} not found on cart`);
      return;
    }
    // 2.1 Exclude the Item
    const updatedProducts = cart.products.filter((prod) => prod.id !== productId);
    // 3. Update the Total Cart
    cart.totalPrice -= p.price * p.quantity;
    console.log({ totalAfter: cart.totalPrice });
    cart.products = updatedProducts;

    await writeFile(this.pathConnection, JSON.stringify(cart), { encoding: 'utf8' });
  }
}
