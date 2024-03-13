import { z } from "zod";

export const createWinterClotheFormSchema = z.object({
          image: z.any(),
          category: z.string().min(1, { message: "Category is required" }),
          title: z.string().min(1, { message: "Title is required" }),
          size: z.string().min(1, { message: "Size is required" }),
          description: z.string().min(1, { message: "Description is required" }),
});

export const updateWinterClotheFormSchema = z.object({
          image: z.any().optional(),
          category: z.string().optional(),
          title: z.string().optional(),
          size: z.string().optional(),
          description: z.string().optional(),
});