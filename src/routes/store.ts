import { Router } from 'express';
import StoreController from '../controllers/store';
const route = Router();

route.get('/', StoreController.getStore);
route.get('/shop/detail/:productId', StoreController.getProductDetail);

route.get('/cart', StoreController.getCart);
route.post('/cart', StoreController.postCart);

export default route;
