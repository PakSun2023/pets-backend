import { MyFavoriteModel } from "../models/myFavorite";

export const getMyFavoriteList = (userId: string) => MyFavoriteModel.findOne({ user: userId });