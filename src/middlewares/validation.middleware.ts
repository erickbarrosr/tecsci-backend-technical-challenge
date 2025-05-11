import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ValidationConfig } from "../types/validation.types";

export const validate = (config: ValidationConfig) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      if (config.body) await config.body.parseAsync(req.body);
      if (config.params) await config.params.parseAsync(req.params);
      if (config.query) await config.query.parseAsync(req.query);

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          success: false,
          errors: error.errors.map((err) => ({
            field: err.path.join("."),
            message: err.message,
          })),
        });
        return;
      }
      next(error);
    }
  };
};
