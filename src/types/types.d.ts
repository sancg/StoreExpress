// TODO: Improve the type for ErrorHandling pattern
interface ICallback {
  (cb: { error?: string | unknown; data?: IProduct[]; path: string; message?: string }): void;
}

interface IProduct {
  id?: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
}

export { ICallback, IProduct };
