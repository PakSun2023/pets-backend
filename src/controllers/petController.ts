import { Request, Response } from "express";
import logger from "../utils/logger";
import { createPet, getPets } from "../services/petService";

export const getPetsList = async (req: Request, res: Response) => {
    try {
        const pets = await getPets();

        return res.status(200).json({ success: true, pets });
    } catch (error) {
        logger.error(error, "create new pet error: ");
        return res.sendStatus(500);
    }
}

export const createNewPet = async (req: Request, res: Response) => {
    try {
        const { name, age, location, color, breed, petImage } = req.body;
        const user = req.body.user;

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