import express from 'express';
import { logout, signin, signup } from '../controllers/userController.js';
const authRouter = express.Router();

authRouter.post('/signup', signup);
authRouter.post('/signin', signin);
authRouter.get('/signout', logout);

export default authRouter;