import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import DBconnect from "./utils/DBconnect";
import router from "./router";
import logger from "./utils/logger";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// base url
app.use('/api/v1', router());

// start server at port 8080
app.listen(8080, async () => {
  logger.info('Server is running at http://localhost:8080/');

  await DBconnect();
});