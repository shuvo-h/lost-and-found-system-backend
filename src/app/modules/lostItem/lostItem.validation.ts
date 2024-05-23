import { z } from "zod";

const createLostItem = z.object({
    body: z.object({
        categoryId: z.string({
            invalid_type_error: "Category ID must be a string",
            required_error: "Category ID is required"
        }),
        lostItemName: z.string({
            invalid_type_error: "Item name must be a string",
            required_error: "Item name is required"
        }),
        description: z.string({
            invalid_type_error: "Description must be a string",
            required_error: "Description is required"
        }),
        location: z.string({
            invalid_type_error: "Location must be a string",
            required_error: "Location is required"
        }),
        lostDate: z.string({
            invalid_type_error: "Date must be a string",
            required_error: "Date is required"
        }),
        status: z.string({
            invalid_type_error: "status must be a string",
            required_error: "status is required"
        }).optional(),
        img: z.string({
            invalid_type_error: "img must be a string",
        }).optional(),
        phone: z.string({
            invalid_type_error: "phone must be a string",
        }).optional(),
        email: z.string({
            invalid_type_error: "email must be a string"
        }).email({message:"Invalid email"}).optional(),
    })
   
});

const updateLostItem = z.object({
    body: z.object({
        lostItemName: z.string({
            invalid_type_error: "Item name must be a string",
            required_error: "Item name is required"
        }).optional(),
        description: z.string({
            invalid_type_error: "Description must be a string",
            required_error: "Description is required"
        }).optional(),
        location: z.string({
            invalid_type_error: "Location must be a string",
            required_error: "Location is required"
        }).optional(),
        lostDate: z.string({
            invalid_type_error: "Date must be a string",
            required_error: "Date is required"
        }).optional(),
        status: z.string({
            invalid_type_error: "status must be a string",
            required_error: "status is required"
        }).optional(),
        img: z.string({
            invalid_type_error: "img must be a string",
        }).optional(),
        phone: z.string({
            invalid_type_error: "phone must be a string",
        }).optional(),
        email: z.string({
            invalid_type_error: "email must be a string"
        }).email({message:"Invalid email"}).optional(),
    })
   
});

export const lostItemValidationSchema = {
    createLostItem,
    updateLostItem,
}
