import { Router } from 'express';
import { getProductDetail, getStore } from '../controllers/store';
const store = Router();

store.get('/', getStore);
store.get('/shop/detail/:productId', getProductDetail);

export default store;
