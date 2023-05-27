import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import logger from "../utils/logger";
import { getPetById } from "../services/petService";
import { getMyFavoriteList } from "../services/userService";
import { MyFavoriteModel } from "../models/myFavorite";

export const getFavoriteList = async (req: Request, res: Response) => {
    try {
        const { user } = req.body;

        const favoriteList = await getMyFavoriteList(user._id);
        const myList: any[] = [];
        if (favoriteList && favoriteList.pets.length > 0) {
            await Promise.all(favoriteList.pets.map(async petId => {
                const pet = await getPetById(petId.toString());

                if (pet) {
                    const petData = pet.toObject();
                    const imageFolder = path.join(__dirname, '..', 'uploads');
                    const imageBase64 = pet.petImage && await fs.promises.readFile(imageFolder + `/${pet.petImage}`);
                    if (imageBase64) {
                        petData.petImage = imageBase64.toString("base64");
                    }
                    myList.push(petData);
                }
            }))
        }

        return res.status(200).json({ success: true, myFavoriteList: myList });
    } catch (error) {
        logger.error(error, "get favorite pets list error: ");
        return res.sendStatus(500);
    }
}

export const addPetToFavoriteList = async (req: Request, res: Response) => {
    try {
        const petId = req.params.id;
        const { user } = req.body;
        if (!user || !petId) return res.status(400).json({ message: "Invalid user or pet info!" });

        const pet = await getPetById(petId);
        if (!pet) return res.status(400).json({ message: "Pet not found!" });

        const existFavoriteList = await getMyFavoriteList(user._id);
        if (existFavoriteList) {
            existFavoriteList.pets = [...existFavoriteList.pets, pet._id];
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
        const petId = req.params.id;
        const { user } = req.body;
        if (!user || !petId) return res.status(400).json({ message: "Invalid user or pet info!" });

        const pet = await getPetById(petId);
        if (!pet) return res.status(400).json({ message: "Pet not found!" });

        const existFavoriteList = await getMyFavoriteList(user._id);
        if (existFavoriteList) {
            // remove pet's id from favorite list 
            const updatedPets = existFavoriteList.pets.filter(p => p.toString() !== pet._id.toString());
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