import { AnyZodObject } from "zod";

export type ValidationConfig = {
  body?: AnyZodObject;
  params?: AnyZodObject;
  query?: AnyZodObject;
};
