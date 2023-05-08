import { PetModel } from "../models/pets";
import logger from "../utils/logger";

// get pets 
export const getPets = () => PetModel.find();

// get pet by id
export const getPetById = (id: string) => PetModel.findById(id);

// create new pet
export const createPet = async (values: Record<string, any>) => {
    try {
        const pet = await new PetModel(values).save();
        return pet.toObject();
    } catch (error) {
        logger.error(error, "create pet service error: ");
    }
};