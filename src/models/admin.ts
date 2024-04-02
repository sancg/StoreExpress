import fs from 'node:fs';
import { extname, join } from 'node:path';
import rootPath from '../utils/paths';
import type { ICallback, IProduct } from '../types/types';

const dbPath = rootPath + '/db/products.json';

class Connection {
  pathConnection: string = rootPath + 'db/products.json';

  // constructor(path: string = rootPath) {
  //   this.connection = path;
  // }

  static getFile(path: string, cb: ICallback) {
    return fs.access(path, (error) => {
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

export class Product implements IProduct {
  id: string = '';
  title: string;
  price: number;
  description: string;
  imageUrl: string;

  constructor({ title, price, description, imageUrl }: Omit<IProduct, 'id'>) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  /**
   * Store the product into DB
   */
  save() {
    this.id = Date.now().toString();
    Connection.getFile(dbPath, (info) => {
      if (!info.error) {
        info?.data?.push(this);
        return fs.writeFile(
          dbPath,
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
  }

  static fetchAll(cb: Function) {
    return Connection.getFile(dbPath, (info) => {
      if (!info.error) {
        cb(info.data);
      }
    });
  }
}
