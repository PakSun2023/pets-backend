import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.listen(8080, async () => {
  console.log('Server is running at http://localhost:8080/');
});