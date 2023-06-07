import { Router } from "express";
import userController from "./user.controller";
import userValidator from "./user.validator";
import uploadMiddleware from "../../middleware/upload.middleware";

class UserRoutes {
    public router: Router;
    constructor() {
        this.router = Router();
        this.router.post(
            '/',
            uploadMiddleware,
            userValidator.save,
            userController.save
        );

        this.router.get(
            '/',
            userController.list
        );

        this.router.get(
            '/:id',
            userController.details
        );

        this.router.delete(
            '/:id',
            userController.delete
        );

        this.router.patch(
            '/:id',
            uploadMiddleware,
            userValidator.edit,
            userController.edit
        )

    }

}


export default new UserRoutes().router;