import { Schema, model } from 'mongoose';
import { UserInterface } from '../interfaces/user.interface';

const userSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        lowercase: true
    },
    phoneNumber: {
        type: String,
    },
    countryCode: {
        type: String
    },
    profileImage: {
        type: String
    }
});

userSchema.index({ email: 1 }, { unique: true });
const UserModel = model<UserInterface>('user', userSchema);
export default UserModel;