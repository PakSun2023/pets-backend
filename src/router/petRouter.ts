import express from 'express';
import { createNewPet, getPetsList } from '../controllers/petController';
import { authorization } from '../middlewares/authorization';

export default (router: express.Router) => {
    router.get('/pets', getPetsList);
    router.post('/pet', authorization, createNewPet);
}