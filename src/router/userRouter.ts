import express from 'express';
import { authorization } from '../middlewares/authorization';
import { addPetToFavoriteList, getFavoriteList, getMessages, postMessage, deleteMessage, removePetFromFavoriteList, replyMessage } from '../controllers/userController';

export default (router: express.Router) => {
    // user favorite list router
    router.get('/user/myFavorites', authorization, getFavoriteList);
    router.put('/user/myFavorites/:id', authorization, addPetToFavoriteList);
    router.delete('/user/myFavorites/:id', authorization, removePetFromFavoriteList);

    // messages router
    router.get('/user/messages/:pid', authorization, getMessages);
    router.post('/user/messages/:pid', authorization, postMessage);

    // staff reply message router
    router.put('/user/messages/:mid', authorization, replyMessage);
    router.delete('/user/messages/:mid', authorization, deleteMessage);
}