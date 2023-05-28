import express from 'express';
import { createNewPet, deletePet, getPetDetail, getPetsList, updatePet } from '../controllers/petController';
import { authorization } from '../middlewares/authorization';
import upload from '../middlewares/fileUpload';

export default (router: express.Router) => {
    /**
     * @openapi
     * '/pets':
     *  get:
     *     tags:
     *     - Pets
     *     summary: Get all pets list
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
     *                  petsData:
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
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.get('/pets', getPetsList);

    /**
     * @openapi
     * '/pet':
     *  post:
     *     tags:
     *     - Pets
     *     summary: Create a single pet data
     *     requestBody:
     *      required: true
     *      content:
     *        multipart/form-data:
     *          schema:
     *              type: object
     *              required:
     *                  - name
     *              properties:
     *                  name:
     *                      type: string
     *                      default: Cat name
     *                  age:
     *                      type: number
     *                      default: 3
     *                  color:
     *                      type: string
     *                      default: White
     *                  breed:
     *                      type: string
     *                      default: Cat breed
     *                  location:
     *                      type: string
     *                      default: SSP
     *                  petPhoto:
     *                      type: image
     *                      default: pet_image.jpeg
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
     *                  pet:
     *                      type: object
     *                      properties:
     *                          _id:
     *                              type: string
     *                          name:
     *                              type: string
     *                          age:
     *                              type: string
     *                          location:
     *                              type: string
     *                          breed:
     *                              type: string
     *                          color:
     *                              type: string
     *                          petImage:
     *                              type: string
     *                          isAdopted:
     *                              type: string
     *                          createdAt:
     *                              type: string
     *                          updatedAt:
     *                              type: string
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.post('/pet', upload.single("petPhoto"), authorization, createNewPet);

    /**
     * @openapi
     * '/pet/{petId}':
     *  get:
     *     tags:
     *     - Pets
     *     summary: Get a single pet data by the petId
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
     *                  pet:
     *                      type: object
     *                      properties:
     *                          _id:
     *                              type: string
     *                          name:
     *                              type: string
     *                          age:
     *                              type: string
     *                          location:
     *                              type: string
     *                          breed:
     *                              type: string
     *                          color:
     *                              type: string
     *                          petImage:
     *                              type: string
     *                          isAdopted:
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
    router.get('/pet/:id', getPetDetail);

    /**
     * @openapi
     * '/pet/{petId}':
     *  put:
     *     tags:
     *     - Pets
     *     summary: Update a single pet data by the petId
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
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.put('/pet/:id', upload.single("petPhoto"), authorization, updatePet);

    /**
     * @openapi
     * '/pet/{petId}':
     *  delete:
     *     tags:
     *     - Pets
     *     summary: Delete a single pet data by the petId
     *     security:
     *      - bearerAuth: []
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
     *      401:
     *        description: UnAuthentication
     *      400:
     *        description: Bad request
     *      500:
     *        description: System error
     */
    router.delete('/pet/:id', authorization, deletePet);
}