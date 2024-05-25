import { z } from "zod";

const createUser = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error:"Name must be string",
            required_error:"Name is required"
        }),
        username: z.string({
            invalid_type_error: "Username must be a string",
            required_error: "Username is required"
        }).refine(value => {
            return /^[a-z][a-z0-9]*$/.test(value);
        }, {
            message: "Username must contain only lowercase letters and numbers, and cannot start with a number"
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
            }).optional(),
            age: z.number({
                invalid_type_error:"Age must be number",
                required_error:"Age is required"
            }).min(0,{message:"Age can't be negative"}).optional(),

        }).optional(),
    })
})
const updateUser = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error:"Name must be string",
            required_error:"Name is required"
        }).optional(),
        username: z.string({
            invalid_type_error: "Username must be a string",
            required_error: "Username is required"
        }).refine(value => {
            return /^[a-z][a-z0-9]*$/.test(value);
        }, {
            message: "Username must contain only lowercase letters and numbers, and cannot start with a number"
        }).optional(),
        email: z.string({
            invalid_type_error:"Email must be string",
            required_error:"Email is required"
        }).email({message:"Invalid email address"}).optional(),
        
        profile: z.object({
            bio: z.string({
                invalid_type_error:"Bio must be string",
                required_error:"Bio is required"
            }).optional().or(z.literal("")),
            
            age: z.number({
                invalid_type_error:"Age must be number",
                required_error:"Age is required"
            }).min(0,{message:"Age can't be negative"}).optional(),

        }).optional(),
    })
})

const passwordChange = z.object({
    body: z.object({
        old_password: z.string({
            invalid_type_error:"Old Password must be string",
            required_error:"Old Password is required"
        }),
        new_password: z.string({
            invalid_type_error:"New Password must be string",
            required_error:"New Password is required"
        }),
        
    })
})

const loginUser = z.object({
    body: z.object({
        email_or_username: z.string({
            invalid_type_error:"Email must be string",
            required_error:"Email is required"
        }),
        password: z.string({
            invalid_type_error:"Password must be string",
            required_error:"Password is required"
        }),
    })
})



export const userValidationSchema = {
    createUser,
    loginUser,
    passwordChange,
    updateUser,
}