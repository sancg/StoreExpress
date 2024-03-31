import { Router } from 'express';
import { getProductForm, postProduct } from '../controllers/admin';
const admin = Router();

admin.get('', getProductForm);

admin.post('/my-listing', postProduct);

export default admin;
