import { z } from "zod";

const createUser = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error:"Name must be string",
            required_error:"Name is required"
        }),
        email: z.string({
            invalid_type_error:"Email must be string",
            required_error:"Email is required"
        }).email({message:"Invalid email address"}),
        password: z.string({
            invalid_type_error:"Password must be string",
            required_error:"Password is required"
        }),
        profile: z.object({
            bio: z.string({
                invalid_type_error:"Bio must be string",
                required_error:"Bio is required"
            }),
            age: z.number({
                invalid_type_error:"Age must be number",
                required_error:"Age is required"
            }).min(0,{message:"Age can't be negative"}),

        }),
    })
})

const loginUser = z.object({
    body: z.object({
        email: z.string({
            invalid_type_error:"Email must be string",
            required_error:"Email is required"
        }).email({message:"Invalid email address"}),
        password: z.string({
            invalid_type_error:"Password must be string",
            required_error:"Password is required"
        }),
    })
})



export const userValidationSchema = {
    createUser,
    loginUser,
}