import express from "express";
import cors from "cors";
import plantRoutes from "../src/routes/plant.routes";
import inverterRoutes from "../src/routes/inverter.routes";
import generationRoutes from "../src/routes/generation.routes";
import powerRoutes from "../src/routes/power.routes";
import temperatureRoutes from "../src/routes/temperature.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/plants", plantRoutes);
app.use("/api/inverters", inverterRoutes);
app.use("/api/generations", generationRoutes);
app.use("/api/powers", powerRoutes);
app.use("/api/temperatures", temperatureRoutes);

export { app };
