import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        pet: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "pet",
        },
        message: { type: String },
        replyMessage: { type: String },
    },
    {
        timestamps: true,
    }
);

export const MessageModel = mongoose.model('Message', MessageSchema);