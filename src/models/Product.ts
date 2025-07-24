import fs from 'node:fs';
import type { IProduct } from '../types/types';
import Connection from './Connection';

export class Product {
  id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;

  constructor({ title, price, description, imageUrl }: Omit<IProduct, 'id'>) {
    this.id = Date.now().toString();
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  save = () => {
    Connection.getFile((info) => {
      if (!info.error) {
        info?.data?.push(this);
        return fs.writeFile(
          info.path,
          JSON.stringify(info.data),
          { encoding: 'utf8' },
          (error) => {
            if (!error) {
              console.log('Product Saved!');
            }
          }
        );
      }
    });
  };
  static async editProduct(infoProduct: IProduct) {
    this.fetchAll((allProducts: IProduct[]) => {
      const indexProduct = allProducts.findIndex((i) => i.id === infoProduct.id);
      allProducts[indexProduct] = infoProduct;

      Connection.getFile((info) => {
        if (!info.error) {
          return fs.writeFile(
            info.path,
            JSON.stringify(allProducts),
            { encoding: 'utf8' },
            (e) => {
              if (!e) {
                console.log('Product Saved!');
              }
            }
          );
        }
      });
    });
  }

  static fetchAll(cb: Function) {
    return Connection.getFile((info) => {
      if (!info.error) {
        cb(info.data);
      }
    });
  }

  static findProductID = async (
    id: string,
    _cb?: Function
  ): Promise<IProduct | undefined | void> => {
    if (!_cb) {
      return new Promise((resolve, reject) => {
        try {
          Connection.getFile((info) => {
            if (!info.error) {
              const { data } = info;
              const product = data?.find((prod) => prod.id == id);
              resolve(product);
            }
          });
        } catch (error) {
          reject(error);
        }
      });
    }

    return Connection.getFile((info) => {
      if (!info.error) {
        const { data } = info;
        const product = data?.find((prod) => prod.id == id);

        if (_cb) {
          return _cb(product ?? {});
        }

        return new Promise<IProduct>((resolve, reject) => {
          try {
            if (product) {
              return resolve(product);
            }
          } catch (error) {
            console.error(error);
            reject(error);
            throw new Error('No product found');
          }
        });
      }
    });
  };
}
