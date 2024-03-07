import { Router } from "express";
import { getStore } from "../controllers/store.js";
const route = Router();

route.get("/", getStore);

export default route;
