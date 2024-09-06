import express from 'express'
import { profile, register } from '../controllers/user.js';
import { login } from '../controllers/user.js';
import { Authenticate } from '../middlewares/auth.js';

const router =express.Router();

router.post("/register",register);

router.post('/login',login);

router.get('/user',Authenticate,profile)

export default router