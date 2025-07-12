import fs from 'node:fs';
import { extname, join } from 'node:path';
import rootPath from '../utils/paths';
import type { ICallback, IProduct } from '../types/types';

class Connection {
  constructor(private readonly dirPath: string = rootPath + '/db/products.json') {}

  static getFile(cb: ICallback, path?: string) {
    const dirPath = new Connection().dirPath;
    return fs.access((path = dirPath), (error) => {
      if (!error) {
        return fs.readFile(path, (error, data) => {
          if (!error) {
            try {
              const retrieve = String(data);
              return cb({ data: JSON.parse(retrieve), path });
            } catch (error) {
              return cb({ error, path });
            }
          }
          cb({ error, path });
        });
      }

      if (extname(path)) {
        return fs.mkdir(join(path, '../'), { recursive: true }, (error) => {
          if (!error) {
            return fs.writeFile(path, '[]', (error) => {
              if (!error) {
                return cb({ message: 'File Created!', data: [], path });
              }

              cb({ error, message: 'Error creating file!', path });
            });
          }

          cb({ error, path });
        });
      }

      cb({ error, message: 'All checks on _getFile failed, please test again :)', path });
    });
  }
}

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
