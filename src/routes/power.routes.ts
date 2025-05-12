import { Router } from "express";
import { getMaxPower } from "../controllers/power.controller";
import { validate } from "../middlewares/validation.middleware";
import { dateRangeSchema, idSchema } from "../validations/power.validation";

const router = Router();

router.get(
  "/inverters/:id/max-power",
  validate({
    params: idSchema,
    query: dateRangeSchema,
  }),
  getMaxPower
);

export default router;
