import { z } from "zod";

export const addNewImageSchema = z.object({
          image: z.any().refine((file) => {
                    if (file) {
                              return file.size < 2097152;
                    }
                    return true;
          }, {
                    message: "Image size should be less than 2MB",
          }),
});