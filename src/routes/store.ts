import { Router } from 'express';
import { getProductDetail, getStore, getCart, postCart } from '../controllers/store';
const store = Router();

store.get('/', getStore);
store.get('/shop/detail/:productId', getProductDetail);

store.get('/cart', getCart);
store.post('/cart', postCart);
export default store;
