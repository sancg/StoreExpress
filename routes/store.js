import { Router } from 'express';
import { getStore } from '../controllers/store.js';
const store = Router();

store.get('/', getStore);

export default store;
