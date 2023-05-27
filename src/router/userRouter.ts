import express from 'express';
import { authorization } from '../middlewares/authorization';
import { addPetToFavoriteList, getFavoriteList, removePetFromFavoriteList } from '../controllers/userController';

export default (router: express.Router) => {
    router.get('/user/myFavorites', authorization, getFavoriteList);
    router.put('/user/myFavorites/:id', authorization, addPetToFavoriteList);
    router.delete('/user/myFavorites/:id', authorization, removePetFromFavoriteList);
}