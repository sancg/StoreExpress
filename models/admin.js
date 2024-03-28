import fs from 'node:fs';
import File from '../utils/File.js';
// Taken from https://fakestoreapi.com/docs
const db = new File();
const dbPath = process.cwd() + '/db/products.json';
export class Product {
  constructor(name, price, desc) {
    this.name = name;
    this.price = price;
    this.desc = desc;
  }

  save() {
    db._getFile(dbPath, (info) => {
      if (!info.error) {
        info.data.push({ title: this.name, price: this.price, description: this.desc });
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
  }

  static fetchAll(cb) {
    return db._getFile(dbPath, (info) => {
      if (!info.error) {
        cb(info?.data);
      }
    });
  }
}
