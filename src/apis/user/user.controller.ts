import { NextFunction, Request, Response } from "express";
import { UserInterface } from "../../interfaces/user.interface";
import { sendResponse } from "../../helpers/send-response.helper";
import userService from "./user.service";

class UserController {
    async save(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as UserInterface;
            const result = await userService.save(body)
            return sendResponse(
                res,
                result.status,
                result.message,
                result.data
            );
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();