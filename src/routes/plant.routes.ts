import { Router } from "express";
import {
  createPlant,
  getAllPlants,
  getPlantById,
  updatePlant,
  deletePlant,
} from "../controllers/plant.controller";
import { validate } from "../middlewares/validation.middleware";
import {
  createPlantSchema,
  updatePlantSchema,
  plantIdSchema,
} from "../validations/plant.validation";

const router = Router();

router.post("/", validate({ body: createPlantSchema }), createPlant);
router.get("/", getAllPlants);
router.get("/:id", validate({ params: plantIdSchema }), getPlantById);
router.put(
  "/:id",
  validate({
    params: plantIdSchema,
    body: updatePlantSchema,
  }),
  updatePlant
);
router.delete("/:id", validate({ params: plantIdSchema }), deletePlant);

export default router;
