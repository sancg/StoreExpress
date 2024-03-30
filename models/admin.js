import fs from 'node:fs';
import File from '../utils/File.js';
// Taken from https://fakestoreapi.com/docs
const db = new File();
const dbPath = process.cwd() + '/db/products.json';
export class Product {
  constructor(name, price, desc, imageUrl) {
    this.name = name;
    this.price = price;
    this.imageUrl = imageUrl;
    this.desc = desc;
  }

  /**
   * Store the product into DB
   */
  save() {
    db._getFile(dbPath, (info) => {
      if (!info.error) {
        info.data.push(this);
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

  static fetchAll(cb) {
    return db._getFile(dbPath, (info) => {
      if (!info.error) {
        cb(info?.data);
      }
    });
  }
}
