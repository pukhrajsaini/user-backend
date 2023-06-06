import { Response } from "express";
import Joi = require("joi");

export const validate = async (body: any, res: Response, schema: Joi.Schema) => {
    try {
        const validation = await schema.validate(body, { abortEarly: false });
        if (validation.error) {
            const error = validation.error.details.map((e: any) => e = e.message);
            res.status(400).json({
                status: 400,
                message: 'Validation failed',
                data: { error }
            });

            return false;
        }
        return true;
    } catch (err) {
        console.log(err);
    }
}