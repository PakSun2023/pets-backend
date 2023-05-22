import express from 'express';
import { createNewPet, deletePet, getPetDetail, getPetsList, updatePet } from '../controllers/petController';
import { authorization } from '../middlewares/authorization';
import upload from '../middlewares/fileUpload';

export default (router: express.Router) => {
    router.get('/pets', getPetsList);
    router.post('/pet', upload.single("petPhoto"), authorization, createNewPet);
    router.get('/pet/:id', getPetDetail);
    router.put('/pet/:id', upload.single("petPhoto"), authorization, updatePet);
    router.delete('/pet/:id', authorization, deletePet);
}