import { ServiceResponse } from "../../interfaces/service-response.interface";
import { UserInterface } from "../../interfaces/user.interface";
import UserModel from "../../model/user.model";
import * as path from 'path';
import * as fs from 'fs';

class UserService {
    /**
     * @description check user is already exists and create a user document
     * @param userData 
     * @returns {ServiceResponse} object
     */
    async save(userData: UserInterface): Promise<ServiceResponse> {
        let user = await UserModel.findOne({ email: userData.email });
        if (user) return { status: 409, message: 'User already exists', data: { user } };
        const profileImage = await this.uploadProfileImage(userData.profileImage);
        user = await UserModel.create({
            firstName: userData.firstName,
            lastName: userData.lastName,
            countryCode: userData.countryCode,
            phoneNumber: userData.phoneNumber,
            email: userData.email,
            profileImage
        })
        return { status: 201, message: 'User created', data: { user } };
    }

    /**
     * @description upload file and get a remote url
     * @param file 
     */
    private uploadProfileImage(file: any): Promise<string> {
        const filePath = `${path.resolve(process.cwd() + '/uploads')}/${file.originalFilename}`;
        return new Promise((resolve, reject) => {
            fs.writeFile(
                filePath,
                fs.readFileSync(file.filepath),
                (err) => {
                    if (err) reject(err);
                    else resolve(`/uploads/${file.originalFilename}`);
                })
        });
    }



}

export default new UserService()