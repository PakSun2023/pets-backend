import express from 'express';
import { authorization } from '../middlewares/authorization';
import { addPetToFavoriteList, getFavoriteList, getMessages, postMessage, deleteMessage, removePetFromFavoriteList, replyMessage } from '../controllers/userController';

export default (router: express.Router) => {
    /**
     * @openapi
     * '/user/myFavorites':
     *  get:
     *     tags:
     *     - My favorite list
     *     summary: Get my favorite list list
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
     *                  myFavoriteList:
     *                      type: array
     *                      items:
     *                          type: object
     *                          properties:
     *                              _id:
     *                                  type: string
     *                              name:
     *                                  type: string
     *                              age:
     *                                  type: string
     *                              location:
     *                                  type: string
     *                              breed:
     *                                  type: string
     *                              color:
     *                                  type: string
     *                              petImage:
     *                                  type: string
     *                              isAdopted:
     *                                  type: string
     *                              createdAt:
     *                                  type: string
     *                              updatedAt:
     *                                  type: string
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.get('/user/myFavorites', authorization, getFavoriteList);

    /**
     * @openapi
     * '/user/myFavorites/{userId}':
     *  put:
     *     tags:
     *     - My favorite list
     *     summary: Add a pet to my favorite list
     *     parameters:
     *      - name: userId
     *        in: path
     *        description: The id of the user
     *        required: true
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
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.put('/user/myFavorites/:id', authorization, addPetToFavoriteList);

    /**
     * @openapi
     * '/user/myFavorites/{userId}':
     *  delete:
     *     tags:
     *     - My favorite list
     *     summary: Remove a pet from my favorite list
     *     parameters:
     *      - name: userId
     *        in: path
     *        description: The id of the user
     *        required: true
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
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.delete('/user/myFavorites/:id', authorization, removePetFromFavoriteList);

    // messages router
    /**
     * @openapi
     * '/user/messages/{petId}':
     *  get:
     *     tags:
     *     - Messages
     *     summary: Get messages list about the pet
     *     parameters:
     *      - name: petId
     *        in: path
     *        description: The id of the pet
     *        required: true
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
     *                  messages:
     *                      type: array
     *                      items:
     *                          type: object
     *                          properties:
     *                              id:
     *                                  type: string
     *                              user:
     *                                  type: string
     *                              message:
     *                                  type: string
     *                              replyMessage:
     *                                  type: string
     *                              createdAt:
     *                                  type: string
     *                              updatedAt:
     *                                  type: string
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.get('/user/messages/:pid', authorization, getMessages);

    /**
     * @openapi
     * '/user/messages/{petId}':
     *  post:
     *     tags:
     *     - Messages
     *     summary: Leave a message about the pet
     *     parameters:
     *      - name: petId
     *        in: path
     *        description: The id of the pet
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *              type: object
     *              required:
     *                  - message
     *              properties:
     *                  message:
     *                      type: string
     *                      default: This is a message
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
     *                  messages:
     *                      type: array
     *                      items:
     *                          type: object
     *                          properties:
     *                              id:
     *                                  type: string
     *                              user:
     *                                  type: string
     *                              message:
     *                                  type: string
     *                              replyMessage:
     *                                  type: string
     *                              createdAt:
     *                                  type: string
     *                              updatedAt:
     *                                  type: string
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.post('/user/messages/:pid', authorization, postMessage);

    // staff reply message router
    /**
     * @openapi
     * '/user/messages/{messageId}':
     *  put:
     *     tags:
     *     - Messages
     *     summary: Reply the message by message id
     *     parameters:
     *      - name: messageId
     *        in: path
     *        description: The id of the message
     *        required: true
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *              type: object
     *              required:
     *                  - message
     *              properties:
     *                  message:
     *                      type: string
     *                      default: This is a reply message
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
     *                  messages:
     *                      type: array
     *                      items:
     *                          type: object
     *                          properties:
     *                              id:
     *                                  type: string
     *                              user:
     *                                  type: string
     *                              message:
     *                                  type: string
     *                              replyMessage:
     *                                  type: string
     *                              createdAt:
     *                                  type: string
     *                              updatedAt:
     *                                  type: string
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.put('/user/messages/:mid', authorization, replyMessage);

    /**
     * @openapi
     * '/user/messages/{messageId}':
     *  delete:
     *     tags:
     *     - Messages
     *     summary: Delete message
     *     parameters:
     *      - name: messageId
     *        in: path
     *        description: The id of the message
     *        required: true
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
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.delete('/user/messages/:mid', authorization, deleteMessage);
}