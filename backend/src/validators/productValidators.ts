import Joi from "joi";

export const productCreateSchema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().min(0).required(),
            category: Joi.string().optional(), // ObjectId as string
            stock: Joi.number().min(0).default(0),
            isFeatured: Joi.boolean().default(false),
});

export const productUpdateSchema = Joi.object({
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            price: Joi.number().min(0).optional(),
            category: Joi.string().optional(),
            stock: Joi.number().min(0).optional(),
            isFeatured: Joi.boolean().optional(),
});
