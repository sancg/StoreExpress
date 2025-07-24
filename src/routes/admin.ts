import { Router } from 'express';
import AdminController from '../controllers/admin';

const adminRoute = Router();

adminRoute.get('', AdminController.getProductForm);
adminRoute.post('', AdminController.sendToEditProduct);

adminRoute.get('/view-products', AdminController.getProducts);

adminRoute.post('/addProduct', AdminController.postProduct);
adminRoute.post('/editProduct', AdminController.editProduct);

export default adminRoute;
