export class Product {
  constructor(name, detail) {
    this.name = name;
    this.detail = detail;
  }

  save() {
    products.push({ name: this.name, detail: this.detail });
  }

  static fetchAll() {
    return products;
  }
}
