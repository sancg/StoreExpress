import { Router } from 'express';
import AdminController from '../controllers/admin';

const adminRoute = Router();

adminRoute.get('', AdminController.getProductForm);
adminRoute.get('/view-products', AdminController.getProducts);

adminRoute.post('/my-listing', AdminController.postProduct);

export default adminRoute;
