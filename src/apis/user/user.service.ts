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

    /**
     * @description get users list with pagination
     * @param queryString 
     * @returns list, count
     */
    async list(queryString: any): Promise<ServiceResponse> {
        const page = queryString.page * 1 || 1;
        const limit = queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        const [count, list] = await Promise.all([
            UserModel.countDocuments(),
            UserModel.find({}).sort('-createdAt').skip(skip).limit(limit)
        ]);
        return {
            status: 200,
            message: 'User list',
            data: { count, list }
        }
    }


    /**
     * @description edit user details
     * @param userId 
     * @param userData 
     * @returns 
     */
    async edit(userId: string, userData: any): Promise<ServiceResponse> {
        let user = await UserModel.findById(userId);
        if (!user) return {
            status: 400, message: 'Invalid user id', data: {}
        }
        let profileImage = user.profileImage;
        if (userData.profileImage && typeof userData.profileImage !== 'string') {
            profileImage = await this.uploadProfileImage(userData.profileImage);
        }
        user.profileImage = profileImage;
        user.firstName = userData.firstName;
        user.lastName = userData.lastName;
        user.email = userData.email;
        user.countryCode = userData.countryCode;
        user.phoneNumber = userData.phoneNumber;
        await user.save();
        return {
            status: 200, message: 'User updated', data: { user }
        }
    }


    /**
     * @description get user details 
     * @param userId 
     * @returns user detail object
     */
    async details(userId: string): Promise<ServiceResponse> {
        const user = await UserModel.findById(userId);
        if (!user) return {
            status: 400, message: 'Invalid user id', data: {}
        }
        return { status: 200, message: 'User details', data: { user } };
    }


    /**
     * @description delete a user for a given id
     * @param userId 
     * @returns success message
     */
    async delete(userId: string): Promise<ServiceResponse> {
        await UserModel.findByIdAndDelete(userId);
        return { status: 200, message: 'User deleted', data: {} }
    }
}

export default new UserService()