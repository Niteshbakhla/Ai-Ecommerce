import Joi from "joi";

export const registerSchema = Joi.object({
            name: Joi.string().trim().min(2).max(50).required(),

            email: Joi.string().trim().lowercase().email().required(),

            password: Joi.string()
                        .min(8)
                        .max(128)
                        .pattern(/^(?=.*[A-Za-z])(?=.*\d).+$/)
                        .messages({
                                    "string.pattern.base": "Password must contain at least one letter and one number",
                        })
                        .required(),

            role: Joi.string().valid("user", "admin").optional(),

            addresses: Joi.array()
                        .items(
                                    Joi.object({
                                                street: Joi.string().trim().optional(),
                                                city: Joi.string().trim().optional(),
                                                state: Joi.string().trim().optional(),
                                                country: Joi.string().trim().optional(),
                                                pincode: Joi.string().trim().optional(),
                                                phone: Joi.string().trim().optional(),
                                    })
                        )
                        .optional(),

            wishlist: Joi.forbidden(),
            lastLogin: Joi.forbidden(),
});




export const loginSchema = Joi.object({
            email: Joi.string()
                        .trim()
                        .lowercase()
                        .email()
                        .required(),

            password: Joi.string().required(),
});





