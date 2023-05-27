import { MessageModel } from "../models/message";
import { MyFavoriteModel } from "../models/myFavorite";
import { UserModel } from "../models/users";
import logger from "../utils/logger";

// get user by id
export const getUserById = (id: string) => UserModel.findById(id);

// get user favorite pets list
export const getMyFavoriteList = (userId: string) => MyFavoriteModel.findOne({ user: userId });

// create new message
export const createNewMessage = async (values: Record<string, any>) => {
    try {
        const pet = await new MessageModel(values).save();
        return pet.toObject();
    } catch (error) {
        logger.error(error, "create new message service error: ");
    }
};

// get messages by pet
export const getMessagesByPet = (petId: string) => MessageModel.find({ pet: petId });

// get message by id
export const getMessageById = (msgId: string) => MessageModel.findById(msgId);

// delete pet by id
export const deleteMessageById = (msgId: string) => MessageModel.findOneAndDelete({ _id: msgId });