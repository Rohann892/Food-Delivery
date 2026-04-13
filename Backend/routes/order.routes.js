import express from 'express'
import { isAuth } from '../middlewares/auth.js';
import { getMyOrder, placeOrder, updateOrderStatus } from '../controllers/order.controller.js';
const orderRouter = express.Router();

orderRouter.post('/place-order', isAuth, placeOrder);
orderRouter.get('/my-orders', isAuth, getMyOrder);
orderRouter.post('/update-status/:orderId/:shopId', isAuth, updateOrderStatus);

export default orderRouter;