import { Document } from "mongoose";

export interface UserInterface extends Document{
    firstName: string;
    lastName: string;
    name: string;
    email: string;
    phoneNumber: string;
    countryCode: string;
    profileImage: string;
}