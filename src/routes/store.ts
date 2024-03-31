import { Router } from 'express';
import { getStore } from '../controllers/store';
const store = Router();

store.get('/', getStore);

export default store;
