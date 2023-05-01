import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import DBconnect from "./utils/DBconnect";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080/');

  await DBconnect();
});