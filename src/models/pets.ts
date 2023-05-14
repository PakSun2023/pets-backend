import mongoose from "mongoose";

const PetSchema = new mongoose.Schema(
    {
        type: { type: String, default: 'cat' },
        name: { type: String },
        age: { type: Number },
        location: { type: String },
        breed: { type: String },
        color: { type: String },
        petImage: { type: String },
        isAdopted: { type: Boolean, default: false },
        handleBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    {
        timestamps: true,
    }
);

export const PetModel = mongoose.model('Pet', PetSchema);