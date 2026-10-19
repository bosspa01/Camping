import { z } from "zod";

export const campingSchema = z.object({
  title: z.string().min(2, "Title must be more than 2 characters"),
  price: z.coerce.number(),
  description: z.string().max(2000, "Description must be less than 2000 characters"),
  category: z.string(),
  lat: z.coerce.number(),
  lng: z.coerce.number(),
  image: z.any(),
});
export const profileSchema = z.object({
  firstname: z.string()
    .min(2, "First name must be more than 2 characters")
    .max(30, "First name must be less than 30 characters"),
  lastname: z.string()
      .min(2, "Last name must be more than 2 characters")
      .max(30, "Last name must be less than 30 characters"),
});