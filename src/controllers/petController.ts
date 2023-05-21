import { Request, Response } from "express";
import fs from "fs";
import logger from "../utils/logger";
import { createPet, getPets } from "../services/petService";
import path from "path";

export const getPetsList = async (req: Request, res: Response) => {
    try {
        const pets = await getPets();

        const petsData = await Promise.all(pets.map(async pet => {
            const petData = pet.toObject();
            const imageFolder = path.join(__dirname, '..', 'uploads');
            const imageBase64 = await fs.promises.readFile(imageFolder + `/${pet.petImage}`);
            petData.petImage = imageBase64.toString("base64");
            return petData
        }))

        return res.status(200).json({ success: true, petsData });
    } catch (error) {
        logger.error(error, "get pets list error: ");
        return res.sendStatus(500);
    }
}

export const createNewPet = async (req: Request, res: Response) => {
    try {
        const { name, age, location, color, breed, petImage } = req.body;
        const user = req.body.user;

        console.log(req.body)

        const pet = await createPet({
            name,
            age,
            location,
            color,
            breed,
            petImage,
            handleBy: user?._id
        })

        return res.status(200).json({ success: true, pet });
    } catch (error) {
        logger.error(error, "create new pet error: ");
        return res.sendStatus(500);
    }
}