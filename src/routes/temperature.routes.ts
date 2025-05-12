import { Router } from "express";
import { getAvgTemperature } from "../controllers/temperature.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  dateRangeSchema,
  temperatureIdSchema,
} from "../validations/temperature.validations";

const router = Router();

router.get(
  "/inverters/:id/avg-temperature",
  validate({
    params: temperatureIdSchema,
    query: dateRangeSchema,
  }),
  getAvgTemperature
);

export default router;
