import express, { Response } from "express";
import authRouter from "./authRouter";
import petRouter from "./petRouter";
import userRouter from "./userRouter";

const router = express.Router();

export default (): express.Router => {
    // api status checking
    /**
     * @openapi
     * /health_check:
     *  get:
     *     tags:
     *     - HealthCheck
     *     description: Responds if the app is running
     *     responses:
     *       200:
     *         description: App server is running
     */
    router.get("/health_check", (_, res: Response) =>
        res.sendStatus(200)
    );

    // router /auth include register and login
    authRouter(router);

    // router /pet
    petRouter(router);

    // router /user include myFavoriteList
    userRouter(router);

    return router;
};