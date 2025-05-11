import express from "express";
import cors from "cors";
import plantRoutes from "../src/routes/plant.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/plants", plantRoutes);

export { app };
