import express from 'express';
import { authorization } from '../middlewares/authorization';
import { login, register, validateLoginUser } from "../controllers/authController";

export default (router: express.Router) => {
    /**
     * @openapi
     * '/auth/register':
     *  post:
     *     tags:
     *     - User Authentication
     *     summary: User registration
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *              type: object
     *              required:
     *                  - username
     *                  - email
     *                  - password
     *                  - role
     *              properties:
     *                  username:
     *                      type: string
     *                      default: Chan Tai Man
     *                  email:
     *                      type: string
     *                      default: example@example.com
     *                  password:
     *                      type: string
     *                      default: stringPassword123!
     *                  role:
     *                      type: string
     *                      default: user
     *                  staffCode:
     *                      type: string
     *                      default: staff_code
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  success:
     *                      type: boolean
     *                  user:
     *                      type: object
     *                      properties:
     *                          _id:
     *                              type: string
     *                          username:
     *                              type: string
     *                          email:
     *                              type: string
     *                          role:
     *                              type: string
     *                          createdAt:
     *                              type: string
     *                          updatedAt:
     *                              type: string
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.post('/auth/register', register);

    /**
     * @openapi
     * '/auth/login':
     *  post:
     *     tags:
     *     - User Authentication
     *     summary: User login
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *              type: object
     *              required:
     *                  - email
     *                  - password
     *              properties:
     *                  email:
     *                      type: string
     *                      default: example@example.com
     *                  password:
     *                      type: string
     *                      default: stringPassword123!
     *     responses:
     *      200:
     *        description: Success
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                  success:
     *                      type: boolean
     *                  user:
     *                      type: object
     *                      properties:
     *                          _id:
     *                              type: string
     *                          username:
     *                              type: string
     *                          email:
     *                              type: string
     *                          role:
     *                              type: string
     *                  token:
     *                      type: string
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.post('/auth/login', login);

    router.get('/auth/me', authorization, validateLoginUser);
}