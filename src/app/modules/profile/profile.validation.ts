import { z } from "zod";

const updateProfile = z.object({
    body: z.object({
        bio: z.string({
            invalid_type_error: "Bio must be a string",
            required_error: "Bio is required"
        }).optional(),
        age: z.number({
            invalid_type_error: "Age must be a number",
            required_error: "Age is required"
        }).optional(),
    })
});

export const profileValidationSchema = {
    updateProfile,
}
