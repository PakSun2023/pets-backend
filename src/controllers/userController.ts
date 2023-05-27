import { Request, Response } from "express";
import logger from "../utils/logger";
import { getPetById } from "../services/petService";
import { getMyFavoriteList } from "../services/userService";
import { MyFavoriteModel } from "../models/myFavorite";

export const getFavoriteList = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;

        const favoriteList = await getMyFavoriteList(user._id);

        return res.status(200).json({ success: true, myFavoriteList: favoriteList });
    } catch (error) {
        logger.error(error, "get favorite pets list error: ");
        return res.sendStatus(500);
    }
}

export const addPetToFavoriteList = async (req: Request, res: Response) => {
    try {
        const { user, petId } = req.body;
        if (!user || !petId) return res.status(400).json({ message: "Invalid user or pet info!" });

        const pet = await getPetById(petId);
        if (!pet) return res.status(400).json({ message: "Pet not found!" });

        const existFavoriteList = await getMyFavoriteList(user._id);
        if (existFavoriteList) {
            existFavoriteList.pets = [...existFavoriteList.pets, petId];
            await existFavoriteList.save();

            return res.status(200).json({ success: true, myFavoriteList: existFavoriteList });
        } else {
            const myFavoriteList = await new MyFavoriteModel({
                user: user._id,
                pets: [petId]
            }).save()

            return res.status(200).json({ success: true, myFavoriteList: myFavoriteList });
        }
    } catch (error) {
        logger.error(error, "update favorite pets list error: ");
        return res.sendStatus(500);
    }
}

export const removePetFromFavoriteList = async (req: Request, res: Response) => {
    try {
        const { user, petId } = req.body;
        if (!user || !petId) return res.status(400).json({ message: "Invalid user or pet info!" });

        const pet = await getPetById(petId);
        if (!pet) return res.status(400).json({ message: "Pet not found!" });

        const existFavoriteList = await getMyFavoriteList(user._id);
        if (existFavoriteList) {
            // remove pet's id from favorite list 
            const updatedPets = existFavoriteList.pets.filter(pet => pet != petId);
            existFavoriteList.pets = updatedPets;
            await existFavoriteList.save();

            return res.status(200).json({ success: true, myFavoriteList: existFavoriteList });
        } else {
            return res.status(400).json({ message: "Pet not found in your favorite list!" });
        }
    } catch (error) {
        logger.error(error, "remove pet from favorite pets list error: ");
        return res.sendStatus(500);
    }
}