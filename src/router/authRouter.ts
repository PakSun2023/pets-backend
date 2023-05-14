import express from 'express';
import { authorization } from '../middlewares/authorization';
import { login, register, validateLoginUser } from "../controllers/authController";

export default(router: express.Router) => {
    router.post('/auth/register', register);
    router.post('/auth/login', login);
    router.get('/auth/me', authorization, validateLoginUser);
}