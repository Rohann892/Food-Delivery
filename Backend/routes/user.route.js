import express from 'express';
import { isAuth } from '../middlewares/auth.js';
import { getCurrentUser, updateLocation } from '../controllers/user.controller.js';
const userRouter = express.Router();

userRouter.get('/current', isAuth, getCurrentUser);
userRouter.post('/update-location', isAuth, updateLocation);


export default userRouter;