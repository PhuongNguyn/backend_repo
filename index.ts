import express from "express";
import dotenv from "dotenv";
import router from "./routes";
import { errorHandlers } from "./middlewares/errorHandler";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use("/api/v1", router);
app.use(errorHandlers);

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
