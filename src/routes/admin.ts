import { Router } from 'express';
import { getProductForm, getProducts, postProduct } from '../controllers/admin';
const admin = Router();

admin.get('', getProductForm);
admin.get('/view-products', getProducts);

admin.post('/my-listing', postProduct);

export default admin;
