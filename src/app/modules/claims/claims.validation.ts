import { CLAIM_STATUS } from "@prisma/client";
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
const updateClaim = z.object({
    body: z.object({
        status: z.enum([CLAIM_STATUS.APPROVED,CLAIM_STATUS.PENDING,CLAIM_STATUS.REJECTED],{invalid_type_error:"Invalid status",required_error:"Status is required"}),
    })
});

export const claimValidationSchema = {
    createClaim,
    updateClaim,
}
