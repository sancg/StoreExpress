import { Router } from 'express';
import { getProductDetail, getStore } from '../controllers/store';
const store = Router();

store.get('/', getStore);
store.get('/shop/detail/:productId', async (req, res) => await getProductDetail(req, res));

export default store;
