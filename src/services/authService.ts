import { UserModel } from "../models/users";
import logger from "../utils/logger";

// get user by email
export const getUserByEmail = (email: string) => UserModel.findOne({ email });

// create new user
export const createUser = async (values: Record<string, any>) => {
    try {
        const user = await new UserModel(values).save();
        return user.toObject();
    } catch (error) {
        logger.error(error, "create user service error: ");
    }
};

// get exist user and validate password
export const validatePassword = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email }).select([
        "password",
        "username",
        "email",
        "role"
    ]);
    if (!user) return false;

    const isValid = user.comparePassword(password);
    if (!isValid) return false;
    return user.toObject();
};