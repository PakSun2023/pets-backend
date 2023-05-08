import express, { Response } from "express";
import authRouter from "./authRouter";
import petRouter from "./petRouter";

const router = express.Router();

export default (): express.Router => {
    // api status checking
    router.get("/health_check", (_, res: Response) =>
        res.sendStatus(200)
    );

    // router /auth include register and login
    authRouter(router);

    // router /pet
    petRouter(router);

    return router;
};