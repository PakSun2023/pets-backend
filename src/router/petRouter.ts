import express from 'express';
import { createNewPet, getPetsList } from '../controllers/petController';
import { authorization } from '../middlewares/authorization';
import upload from '../middlewares/fileUpload';

export default (router: express.Router) => {
    router.get('/pets', getPetsList);
    router.post('/pet', upload.single("petPhoto"), authorization, createNewPet);
}