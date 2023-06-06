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


    async list(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as any;
            const result = await userService.list(query)
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


    async edit(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id as string;
            const result = await userService.edit(userId, req.body)
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


    async details(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id as string;
            const result = await userService.details(userId)
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


    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id as string;
            const result = await userService.delete(userId)
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