import { Router } from "express";
import {
  getInverterGeneration,
  getPlantGeneration,
} from "../controllers/generation.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  dateRangeSchema,
  idSchema,
} from "../validations/generation.validation";

const router = Router();

router.get(
  "/inverters/:id/generation",
  validate({
    params: idSchema,
    query: dateRangeSchema,
  }),
  getInverterGeneration
);

router.get(
  "/plants/:id/generation",
  validate({
    params: idSchema,
    query: dateRangeSchema,
  }),
  getPlantGeneration
);

export default router;
