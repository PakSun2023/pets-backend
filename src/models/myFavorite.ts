import mongoose from "mongoose";

const MyFavoriteSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            require: true,
        },
        pets: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "pet",
            }
        ]
    },
    {
        timestamps: true,
    }
);

export const MyFavoriteModel = mongoose.model('MyFavorite', MyFavoriteSchema);