import { readFile, writeFile } from 'node:fs/promises';
import { IProduct, modelCart } from '../types/types';
import rootPath from '../utils/paths';

export class Cart {
  private static pathConnection: string = rootPath + '/db/cart.json';

  static async addProduct(p: IProduct) {
    // Fetch the previous cart
    let cart: modelCart = { products: [], totalPrice: 0 };

    try {
      cart = JSON.parse(await readFile(this.pathConnection, { encoding: 'utf8' }));
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
    console.log({ cart });
    await writeFile(this.pathConnection, JSON.stringify(cart, null, 2));
  }
}
