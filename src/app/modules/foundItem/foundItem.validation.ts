import { z } from "zod";

const createFoundItem = z.object({
    body: z.object({
        categoryId: z.string({
            invalid_type_error: "Category ID must be a string",
            required_error: "Category ID is required"
        }),
        foundItemName: z.string({
            invalid_type_error: "Found item name must be a string",
            required_error: "Found item name is required"
        }),
        description: z.string({
            invalid_type_error: "Description must be a string",
            required_error: "Description is required"
        }),
        location: z.string({
            invalid_type_error: "Location must be a string",
            required_error: "Location is required"
        }),
    })
});

export const foundItemValidationSchema = {
    createFoundItem,
}
