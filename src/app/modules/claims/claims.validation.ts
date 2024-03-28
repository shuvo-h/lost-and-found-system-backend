import { z } from "zod";

const createClaim = z.object({
    body: z.object({
        foundItemId: z.string({
            invalid_type_error: "Found item ID must be a string",
            required_error: "Found item ID is required"
        }),
        distinguishingFeatures: z.string({
            invalid_type_error: "Feature must be a string",
            required_error: "Feature is required"
        }),
        lostDate: z.string({
            invalid_type_error: "Loast Date must be a string",
            required_error: "Loast Date is required"
        }),
    })
});

export const claimValidationSchema = {
    createClaim,
}
