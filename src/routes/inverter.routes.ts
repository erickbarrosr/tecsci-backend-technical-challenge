import { Router } from "express";
import {
  createInverter,
  getAllInverters,
  getInverterById,
  updateInverter,
  deleteInverter,
} from "../controllers/inverter.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  createInverterSchema,
  updateInverterSchema,
  inverterIdSchema,
} from "../validations/inverter.validation";

const router = Router();

router.post("/", validate({ body: createInverterSchema }), createInverter);
router.get("/", getAllInverters);
router.get("/:id", validate({ params: inverterIdSchema }), getInverterById);
router.put(
  "/:id",
  validate({ params: inverterIdSchema, body: updateInverterSchema }),
  updateInverter
);
router.delete("/:id", validate({ params: inverterIdSchema }), deleteInverter);

export default router;
