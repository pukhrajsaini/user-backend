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
    }

}


export default new UserRoutes().router;