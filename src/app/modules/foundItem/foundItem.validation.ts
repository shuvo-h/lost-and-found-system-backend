import { z } from "zod";


const createFoundItem = z.object({
    body: z.object({
      categoryId: z.string({
        invalid_type_error: "Category ID must be a string",
        required_error: "Category ID is required",
      }),
      foundItemName: z.string({
        invalid_type_error: "Found item name must be a string",
        required_error: "Found item name is required",
      }),
      description: z.string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required",
      }),
      location: z.string({
        invalid_type_error: "Location must be a string",
        required_error: "Location is required",
      }),
      claim_process: z.string({
        invalid_type_error: "Claim process must be a string",
        required_error: "Claim process is required",
      }),
      phone: z.string().optional(),
      email: z.string().email({ message: "Invalid email address" }).optional(),
    }),
  });

const updateFoundItem = z.object({
    body: z.object({
      categoryId: z.string({
        invalid_type_error: "Category ID must be a string",
        required_error: "Category ID is required",
      }).optional(),
      foundItemName: z.string({
        invalid_type_error: "Found item name must be a string",
        required_error: "Found item name is required",
      }).optional(),
      description: z.string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required",
      }).optional(),
      location: z.string({
        invalid_type_error: "Location must be a string",
        required_error: "Location is required",
      }).optional(),
      claim_process: z.string({
        invalid_type_error: "Claim process must be a string",
        required_error: "Claim process is required",
      }).optional(),
      phone: z.string().optional(),
      email: z.string().email({ message: "Invalid email address" }).optional(),
    }),
  });

export const foundItemValidationSchema = {
    createFoundItem,
    updateFoundItem,
}
