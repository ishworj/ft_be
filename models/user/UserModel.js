import UserModel from './UserSchema.js'

export const createUser = (userObj)=>{
    return UserModel(userObj).save();
}