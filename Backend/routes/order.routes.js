import express from 'express'
import { isAuth } from '../middlewares/auth.js';
import { getMyOrder, placeOrder } from '../controllers/order.controller.js';
const orderRouter = express.Router();

orderRouter.post('/place-order', isAuth, placeOrder);
orderRouter.get('/my-orders', isAuth, getMyOrder);

export default orderRouter;