import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import logger from "../utils/logger";
dotenv.config();

const { JWT_SECRET } = process.env;

export const authorization = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.header("Authorization")?.split("Bearer ")[1];
        if (!accessToken)
            return res.status(401).json({
                message: "token unauthorized",
            });

        const decoded = jwt.verify(accessToken, JWT_SECRET!);
        req.body.user = decoded;
        return next();
    } catch (error: any) {
        logger.error(error);
        return res.status(401).json({
            message: "token unauthorized",
        });
    }
};