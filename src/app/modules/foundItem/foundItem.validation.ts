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
      phone: z.string().optional().or(z.literal('')),
      email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal('')),
    }),
  });

const updateFoundItem = z.object({
    body: z.object({
      categoryId: z.string({
        invalid_type_error: "Category ID must be a string",
        required_error: "Category ID is required",
      }).optional().or(z.literal('')),
      foundItemName: z.string({
        invalid_type_error: "Found item name must be a string",
        required_error: "Found item name is required",
      }).optional().or(z.literal('')),
      description: z.string({
        invalid_type_error: "Description must be a string",
        required_error: "Description is required",
      }).optional().or(z.literal('')),
      location: z.string({
        invalid_type_error: "Location must be a string",
        required_error: "Location is required",
      }).optional().or(z.literal('')),
      claim_process: z.string({
        invalid_type_error: "Claim process must be a string",
        required_error: "Claim process is required",
      }).optional().or(z.literal('')),
      phone: z.string().optional().or(z.literal('')),
      email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal('')),
    }),
  });

export const foundItemValidationSchema = {
    createFoundItem,
    updateFoundItem,
}
