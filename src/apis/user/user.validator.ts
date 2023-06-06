import { NextFunction, Request, Response } from "express";
import * as Joi from 'joi';
import { validate } from "../../helpers/validate.helper";

class UserValidator {

    async save(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            countryCode: Joi.string().required(),
            email: Joi.string().required(),
            profileImage: Joi.any().required()
        });

        const isValid = validate(req.body, res, schema);
        if (isValid) next();
    }
}


export default new UserValidator();