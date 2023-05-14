import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        password: { type: String, select: false },
        role: { type: String, require: false, enum: ['admin', 'staff', 'user'] },
        provider: { type: String }
    },
    {
        timestamps: true,
        methods: {
            comparePassword(password: string) {
                return bcrypt.compareSync(password, this.password!);
            }
        }
    }
);

// encrypt password before save to database
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    if (!this.provider) this.provider = 'email';

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password!, salt);
    this.password = hash;
    next();
});

export const UserModel = mongoose.model('User', UserSchema);