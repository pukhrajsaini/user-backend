import { Router } from "express";
import userRoute from "../apis/user/user.route";

class Routes {
    public router: Router;
    constructor(){
        this.router = Router();
        this.app()
    }


    app(){
        this.router.use('/user', userRoute);
    }
}


export default new Routes().router;