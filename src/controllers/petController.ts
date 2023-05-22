import { Request, Response } from "express";
import fs from "fs";
import logger from "../utils/logger";
import { createPet, deletePetById, getPets } from "../services/petService";
import path from "path";
import { getPetById } from "../services/petService";

export const getPetsList = async (req: Request, res: Response) => {
    try {
        const pets = await getPets();

        const petsData = await Promise.all(pets.map(async pet => {
            const petData = pet.toObject();
            const imageFolder = path.join(__dirname, '..', 'uploads');
            const imageBase64 = pet.petImage && await fs.promises.readFile(imageFolder + `/${pet.petImage}`);
            if (imageBase64) {
                petData.petImage = imageBase64.toString("base64");
            }
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
        const { name, description, age, location, color, breed, petImage } = req.body;
        const user = req.body.user;

        const pet = await createPet({
            name,
            description,
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

export const getPetDetail = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const pet = await getPetById(id);

        if (pet) {
            const imageFolder = path.join(__dirname, '..', 'uploads');
            const imageBase64 = pet.petImage && await fs.promises.readFile(imageFolder + `/${pet.petImage}`);
            if (imageBase64) {
                pet.petImage = imageBase64.toString("base64");
            }
            return res.status(200).json({ success: true, pet });
        }
        else return res.status(400).json({ message: "Pet not found!" });
    } catch (error) {
        logger.error(error, "pet detail error: ");
        return res.sendStatus(500);
    }
}

export const updatePet = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { name, description, age, location, color, breed, petImage } = req.body;

        const pet = await getPetById(id);
        if (!pet) return res.status(400).json({ message: "Pet not found!" });

        if (name) pet.name = name;
        if (description) pet.description = description;
        if (age) pet.age = age;
        if (location) pet.location = location;
        if (color) pet.color = color;
        if (breed) pet.breed = breed;
        if (petImage) pet.petImage = petImage;

        await pet.save();
        return res.status(200).json({ success: true, pet });
    } catch (error) {
        logger.error(error, "create new pet error: ");
        return res.sendStatus(500);
    }
}

export const deletePet = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const deletedPet = await deletePetById(id);

        return res.status(200).json({ success: true, deletedPet });
    } catch (error) {
        logger.error(error, "delete pet error: ");
        return res.sendStatus(500);
    }
}